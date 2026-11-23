import Script from "next/script";

/**
 * Public tracking tags. Nothing is rendered unless the matching env var is set
 * at build time. Do not put real IDs in source.
 *
 * NEXT_PUBLIC_GA_MEASUREMENT_ID   GA4 measurement ID, G-XXXXXXXX
 * NEXT_PUBLIC_GOOGLE_TAG_ID       Google tag ID, G-, GT-, or AW-
 * NEXT_PUBLIC_LINKEDIN_PARTNER_ID LinkedIn Insight Tag partner ID (digits)
 * NEXT_PUBLIC_X_PIXEL_ID          X (Twitter) website pixel ID
 *
 * GA4 and the Google tag share one gtag.js load when either ID is present.
 */

function matchId(value: string | undefined, pattern: RegExp): string | null {
  const id = value?.trim();
  if (!id || !pattern.test(id)) return null;
  return id;
}

export function TrackingTags() {
  const gaId = matchId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, /^G-[A-Z0-9]+$/);
  const googleTagId = matchId(process.env.NEXT_PUBLIC_GOOGLE_TAG_ID, /^(?:G|GT|AW)-[A-Z0-9]+$/);
  const linkedInId = matchId(process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID, /^\d{1,12}$/);
  const xPixelId = matchId(process.env.NEXT_PUBLIC_X_PIXEL_ID, /^[A-Za-z0-9]{4,32}$/);
  const googleIds = [...new Set([gaId, googleTagId].filter((id): id is string => Boolean(id)))];
  const primaryGoogle = googleIds[0];

  return (
    <>
      {primaryGoogle ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${primaryGoogle}`} strategy="afterInteractive" />
          <Script id="google-tag" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${googleIds.map((id) => `gtag('config','${id}');`).join("")}`}
          </Script>
        </>
      ) : null}
      {linkedInId ? (
        <>
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`_linkedin_partner_id="${linkedInId}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);`}
          </Script>
          <noscript>
            {/* Tracking pixel. next/image cannot emit a noscript fallback. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://px.ads.linkedin.com/collect/?pid=${linkedInId}&fmt=gif`} />
          </noscript>
        </>
      ) : null}
      {xPixelId ? (
        <Script id="x-pixel" strategy="afterInteractive">
          {`!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');twq('config','${xPixelId}');`}
        </Script>
      ) : null}
    </>
  );
}
