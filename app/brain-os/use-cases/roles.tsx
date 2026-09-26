'use client';

import { ClipboardCheck, Landmark, MessageSquare, ShieldCheck, Truck, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/artfield/tabs';
import { ROLE_TABS, ROLES } from './content';

const icons = { dispatch: Truck, carrier: Users, billing: ClipboardCheck, leadership: Landmark, teach: MessageSquare } as const;

// One product window per desk, in the homepage's own window idiom.
export function RoleTabs() {
  return (
    <Tabs defaultValue={ROLE_TABS[0].id} className="bp-role-tabs">
      <TabsList className="bp-role-nav" aria-label="Pick a desk">
        {ROLE_TABS.map(role => {
          const Icon = icons[role.id as keyof typeof icons];
          return <TabsTrigger key={role.id} value={role.id}><Icon size={17} />{role.name}</TabsTrigger>;
        })}
      </TabsList>
      {ROLE_TABS.map(role => (
        <TabsContent key={role.id} value={role.id} className="bp-role-panel">
          <div className="bp-window">
            <div className="bp-window-top"><span>Brain OS · {role.name}</span><span className="connected"><span /> {role.sub}</span></div>
            <ul className="bp-exchanges">
              {role.exchanges.map(x => (
                <li key={x.they}>
                  <p className="bp-they"><span className="person-initial" aria-hidden="true">{role.name[0]}</span><span>{x.they}</span></p>
                  <p className="bp-does">{x.does}</p>
                </li>
              ))}
            </ul>
            <div className="bp-window-bottom"><ShieldCheck size={15} /><span>Sources attached. Drafts before writes. Money behind tiers.</span><span>{ROLES.caption}</span></div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
