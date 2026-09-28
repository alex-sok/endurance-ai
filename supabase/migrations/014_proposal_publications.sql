-- Client-ready proposals use private rows, never the legacy public portal policies.
create table if not exists proposal_publications (
  id uuid primary key,
  org_id uuid not null,
  slug text unique not null,
  revision integer not null check (revision > 0),
  operation integer not null check (operation > 0),
  content jsonb not null,
  pdf text not null,
  password_hash text not null,
  is_published boolean not null default false,
  issued_at timestamptz not null,
  updated_at timestamptz not null default now()
);
alter table proposal_publications enable row level security;
revoke all on proposal_publications from anon, authenticated;
grant all on proposal_publications to service_role;

-- A single locked update promotes the document, PDF and access policy together.
-- Monotonic operation IDs prevent late retries from reviving revoked links.
create or replace function publish_proposal(p jsonb, p_password_hash text)
returns text language plpgsql security invoker set search_path = public as $$
declare current_row proposal_publications; proposal_id uuid := (p->>'id')::uuid;
begin
  perform pg_advisory_xact_lock(hashtextextended('proposal:' || proposal_id::text, 0));
  select * into current_row from proposal_publications where id = proposal_id for update;
  if found then
    if current_row.org_id <> (p->>'orgId')::uuid or current_row.slug <> p->>'slug' then return 'conflict'; end if;
    if current_row.operation > (p->>'operation')::integer then return 'stale'; end if;
    if current_row.operation = (p->>'operation')::integer then
      if current_row.revision = (p->>'revision')::integer and current_row.content = p->'content'
        and current_row.is_published = (p->>'active')::boolean then return 'ok'; end if;
      return 'conflict';
    end if;
    if (p->>'active')::boolean and current_row.password_hash = '' and p_password_hash is null then return 'code_required'; end if;
    update proposal_publications set revision=(p->>'revision')::integer, operation=(p->>'operation')::integer,
      content=p->'content', pdf=p->>'pdf', password_hash=coalesce(p_password_hash,current_row.password_hash),
      is_published=(p->>'active')::boolean, issued_at=(p->>'issuedAt')::timestamptz, updated_at=now()
      where id=proposal_id;
  else
    if (p->>'active')::boolean and p_password_hash is null then return 'code_required'; end if;
    if exists (select 1 from portals where slug=p->>'slug') then return 'conflict'; end if;
    insert into proposal_publications(id,org_id,slug,revision,operation,content,pdf,password_hash,is_published,issued_at)
      values(proposal_id,(p->>'orgId')::uuid,p->>'slug',(p->>'revision')::integer,(p->>'operation')::integer,
        p->'content',p->>'pdf',coalesce(p_password_hash,''),(p->>'active')::boolean,(p->>'issuedAt')::timestamptz);
  end if;
  return 'ok';
exception when unique_violation then return 'conflict';
end;
$$;
revoke all on function publish_proposal(jsonb,text) from public, anon, authenticated;
grant execute on function publish_proposal(jsonb,text) to service_role;
