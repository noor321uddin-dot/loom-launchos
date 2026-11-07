import React from 'react';
import {Img, staticFile} from 'remotion';
import {A, C, CountUp, F, Frame, Headline, JobQuote, MEDIA_W, Phone, Rise, Shot, Strike, Sub, Timeline} from './theme';

const TOTAL = 13;

// Each slide answers one line of the Launch OS posting. `say` is the spoken
// line; the presenter's notes window (/?notes) shows it.

const Cover: React.FC = () => (
  <Frame n={1} total={TOTAL}>
    <JobQuote topic="the role">Own the path from ad click to booked call, follow-up, and sale.</JobQuote>
    <Headline size={120} lines={['That’s the job', <>I already <A>do.</A></>]} />
    <Sub delay={22}>
      Noor Uddin. GoHighLevel, automation and Meta-first tracking for North American clients, remote from
      Bangladesh.
    </Sub>
    <Timeline
      delay={30}
      stops={[
        {label: 'Ad', sub: 'Meta'},
        {label: 'Page', sub: 'GHL funnel'},
        {label: 'Form', sub: 'qualify'},
        {label: 'CRM', sub: 'route + assign'},
        {label: 'Follow-up', sub: 'SMS + email'},
        {label: 'Booked', sub: 'calendar'},
        {label: 'Sale', sub: 'recorded', active: true},
      ]}
    />
  </Frame>
);

const FIT: [string, string][] = [
  ['Funnels, design, booking flows', 'Landing pages designed and built for three brands'],
  ['GoHighLevel and HubSpot', 'GHL daily. HubSpot hands-on before, not recent'],
  ['HTML, CSS, JavaScript', 'I read and edit it. Claude Code drafts, I test'],
  ['Pipelines, routing, assignment', 'Lifecycle fixes, per-community pipelines, rep routing'],
  ['Email and SMS automations', 'Intake, reminders, follow-up and reactivation drips'],
  ['Integrations, no duplicates', 'Webhook capture, one de-duplicated lead event'],
  ['Meta-first attribution', 'Pixel plus Conversion API, UTMs on 24 of 24 leads'],
  ['Dashboards that reconcile', 'Caught 413 page views counted as conversions'],
  ['QC before handoff', 'Written pass/fail list, 167 of 167 fixes closed'],
];

const Fit: React.FC = () => (
  <Frame n={2} total={TOTAL}>
    <Headline size={96} delay={2} lines={['Your brief,', <A>line by line.</A>]} />
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {FIT.map(([need, proof], i) => (
        <Rise key={need} delay={16 + i * 6}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '14px 0',
              borderTop: `1px solid ${C.line}`,
              fontSize: 26,
            }}
          >
            <div style={{width: 14, height: 14, borderRadius: 14, background: C.accent, flex: 'none'}} />
            <div style={{width: 420, fontWeight: 700, flex: 'none'}}>{need}</div>
            <div style={{color: C.body}}>{proof}</div>
          </div>
        </Rise>
      ))}
    </div>
  </Frame>
);

const Funnels: React.FC = () => (
  <Frame
    n={3}
    total={TOTAL}
    media={
      <div style={{position: 'relative', width: MEDIA_W, height: 620}}>
        <Shot
          src="shots/mch-lp-first-home-gst-01-hero-desktop.jpg"
          srcW={1536}
          crop={{x: 0, y: 0, w: 1536, h: 770}}
          width={700}
          label="Martell Custom Homes · first-home qualifier page"
          delay={14}
          style={{position: 'absolute', left: 0, top: 40}}
        />
        <Phone
          src="shots/mch-lp-first-home-gst-02-hero-mobile.jpg"
          width={250}
          delay={26}
          style={{position: 'absolute', right: 0, top: 96}}
        />
      </div>
    }
  >
    <JobQuote topic="funnels">Landing pages, sales pages, applications, booking flows.</JobQuote>
    <Headline size={80} lines={['Ad to application', <>to a booked <A>tour.</A></>]} />
    <Sub delay={22} size={26}>
      New lead → Contacted → Tour booked → Reserved → Closed. One pipeline per community, five community pages plus
      this qualifier.
    </Sub>
    <Sub delay={30} size={24} color={C.muted}>
      Design, build, forms, pipeline and tracking: all mine.
    </Sub>
  </Frame>
);

const Thumb: React.FC<{src: string; h: number; delay: number; pos?: string; style?: React.CSSProperties}> = ({
  src,
  h,
  delay,
  pos = 'top',
  style,
}) => (
  <Rise delay={delay} style={style}>
    <Img
      src={staticFile(`shots/${src}`)}
      style={{
        display: 'block',
        width: '100%',
        height: h,
        objectFit: 'cover',
        objectPosition: pos,
        borderRadius: 8,
        boxShadow: '0 10px 30px rgba(18,21,25,0.14)',
      }}
    />
  </Rise>
);

const Brand: React.FC<{name: string; url: string; hero: string; small?: string[]; lower?: string; delay: number}> = ({
  name,
  url,
  hero,
  small = [],
  lower,
  delay,
}) => (
  <div style={{flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10}}>
    <Rise delay={delay}>
      <div style={{fontSize: 26, fontWeight: 700}}>{name}</div>
      <div style={{fontFamily: F.mono, fontSize: 20, color: C.muted, whiteSpace: 'nowrap'}}>{url}</div>
    </Rise>
    <Thumb src={hero} h={197} delay={delay + 4} />
    {lower && <Thumb src={lower} h={202} delay={delay + 10} pos="50% 60%" />}
    {small.length > 0 && (
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10}}>
        {small.map((s, i) => (
          <Thumb key={s} src={s} h={96} delay={delay + 8 + i * 3} />
        ))}
      </div>
    )}
  </div>
);

const Pages: React.FC = () => (
  <Frame n={4} total={TOTAL}>
    <JobQuote topic="polished funnels">Pages look intentional, work across devices, and require minimal avoidable rework.</JobQuote>
    <Headline size={80} lines={[<>Three brands. <A>All live.</A></>]} />
    <div style={{display: 'flex', gap: 24}}>
      <Brand
        delay={14}
        name="Crazy Creek"
        url="listing.crazycreekresort.com"
        hero="cc-lp-all-01-hero-desktop.jpg"
        small={[
          'cc-lp-cabins-01-hero-desktop.jpg',
          'cc-lp-sled-and-stay-01-hero-desktop.jpg',
          'cc-lp-family-reunion-01-hero-desktop.jpg',
          'cc-lp-rv-camping-01-hero-desktop.jpg',
        ]}
      />
      <Brand
        delay={22}
        name="Martell Custom Homes"
        url="listing.martellcustomhomes.com"
        hero="mch-lp-riverview-heights-01-hero-desktop.jpg"
        small={[
          'mch-lp-brookside-west-01-hero-desktop.jpg',
          'mch-lp-fairways-01-hero-desktop.jpg',
          'mch-lp-jonathan-park-01-hero-desktop.jpg',
          'mch-lp-valley-estates-01-hero-desktop.jpg',
        ]}
      />
      <Brand
        delay={30}
        name="Martell Properties"
        url="listing.noveracourt.ca"
        hero="mp-lp-building2-01-hero-desktop.jpg"
        lower="mp-lp-building2-02-section-mobile.jpg"
      />
    </div>
    <Sub delay={46} size={24}>
      Designed and built by me, along with the forms, CRM wiring and tracking behind them.
    </Sub>
  </Frame>
);

const Stat: React.FC<{n: React.ReactNode; label: string; delay: number}> = ({n, label, delay}) => (
  <Rise delay={delay} style={{flex: 1}}>
    <div style={{fontFamily: F.heading, fontWeight: 800, fontSize: 104, lineHeight: 1, letterSpacing: -3}}>{n}</div>
    <div style={{fontSize: 26, lineHeight: 1.35, color: C.body, marginTop: 14, paddingRight: 24}}>{label}</div>
  </Rise>
);

const Crm: React.FC = () => (
  <Frame n={5} total={TOTAL}>
    <JobQuote topic="CRM">Qualification logic, lead routing, sales assignments.</JobQuote>
    <Headline size={104} lines={['An 84-unit lease-up:', <>leads came in <A>and died.</A></>]} />
    <div style={{display: 'flex', borderTop: `2px solid ${C.ink}`, paddingTop: 28}}>
      <Stat delay={22} n={<CountUp to={951} delay={22} />} label="leads a year" />
      <Stat delay={28} n={<CountUp to={5} delay={28} duration={13} />} label="workflows built, never switched on" />
      <Stat delay={34} n={<><CountUp to={45} delay={34} />%</>} label="of leads with no source" />
      <Stat delay={40} n={<A><CountUp to={99} delay={40} />%</A>} label="of opportunities with no owner" />
    </div>
  </Frame>
);

const chip: React.CSSProperties = {
  border: `2px solid ${C.ink}`,
  borderRadius: 999,
  padding: '8px 20px',
  fontSize: 24,
  fontWeight: 600,
  whiteSpace: 'nowrap',
};

const Automations: React.FC = () => (
  <Frame
    n={6}
    total={TOTAL}
    media={
      <Shot
        src="shots/cc-ghl-01-workflows.jpg"
        srcW={1565}
        crop={{x: 290, y: 235, w: 610, h: 405}}
        width={760}
        label="GoHighLevel · workflows · Crazy Creek"
        delay={14}
        marks={[{x: 292, y: 320, w: 606, h: 42}]}
      />
    }
  >
    <JobQuote topic="automations">Develop email and SMS automations.</JobQuote>
    <Headline size={80} lines={['One lifecycle.', <A>Every lead owned.</A>]} />
    <Sub delay={20} size={24} color={C.muted}>
      Inherited workflows, fixed and switched on: 1.0 New lead → 2.0 SAL → Soft commit → 4.0 Lease signed
    </Sub>
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>
      {['Owner routing + alerts', 'Appointment reminders', 'Won/Lost automation', 'Consent-filtered reactivation', 'Crazy Creek intake: 111 enrolled'].map(
        (t, i) => (
          <Rise key={t} delay={28 + i * 5}>
            <div style={i === 4 ? {...chip, background: C.ink, color: C.bg} : chip}>{t}</div>
          </Rise>
        ),
      )}
    </div>
  </Frame>
);

const Item: React.FC<{head: string; delay: number; children: React.ReactNode}> = ({head, delay, children}) => (
  <Rise delay={delay} style={{borderTop: `1px solid ${C.line}`, paddingTop: 12}}>
    <div style={{fontSize: 24, lineHeight: 1.35, color: C.body}}>
      <b style={{color: C.ink}}>{head}</b> {children}
    </div>
  </Rise>
);

const Integrations: React.FC = () => (
  <Frame
    n={7}
    total={TOTAL}
    media={
      <Shot
        src="shots/mp-gtm-01-tags.jpg"
        srcW={1565}
        crop={{x: 205, y: 205, w: 795, h: 392}}
        width={820}
        label="Google Tag Manager · Martell Properties"
        delay={14}
        marks={[
          {x: 208, y: 237, w: 788, h: 30},
          {x: 208, y: 301, w: 788, h: 30},
          {x: 208, y: 562, w: 788, h: 30},
        ]}
      />
    }
  >
    <JobQuote topic="integrations">Prevent duplicate actions, and troubleshoot failed transfers.</JobQuote>
    <Headline size={80} lines={['When data breaks,', <A>I find where.</A>]} />
    <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
      <Item head="Failed transfer." delay={22}>
        Crazy Creek’s Google Ads saw no leads. Cause: a broken GTM label lookup. Fixed, then verified in Ads.
      </Item>
      <Item head="Duplicates." delay={28}>
        A GHL form listener fires one generate_lead, sent once to GA4, Google Ads and Meta.
      </Item>
      <Item head="Leaks." delay={34}>
        Caught one brand’s clicks firing the other brand’s lead tag.
      </Item>
    </div>
  </Frame>
);

const Fact: React.FC<{big: React.ReactNode; label: string; delay: number}> = ({big, label, delay}) => (
  <Rise delay={delay} style={{flex: 1, borderTop: `2px solid ${C.ink}`, paddingTop: 14}}>
    <div style={{fontFamily: F.heading, fontWeight: 800, fontSize: 40, letterSpacing: -1}}>{big}</div>
    <div style={{fontSize: 22, lineHeight: 1.3, color: C.body, marginTop: 6, paddingRight: 16}}>{label}</div>
  </Rise>
);

const Attribution: React.FC = () => (
  <Frame
    n={8}
    total={TOTAL}
    media={
      <Shot
        src="shots/mp-meta-01-campaigns-leads-may-nov.jpg"
        srcW={1510}
        crop={{x: 200, y: 258, w: 645, h: 365}}
        width={780}
        label="Meta Ads Manager · May 4 to Nov 1, 2026"
        delay={14}
        marks={[
          {x: 204, y: 390, w: 634, h: 38},
          {x: 204, y: 527, w: 634, h: 36},
        ]}
      />
    }
  >
    <JobQuote topic="attribution">Preserving campaign information, validating conversion events.</JobQuote>
    <Headline
      size={80}
      lines={[
        <>
          CA$<CountUp to={19593} delay={8} duration={41} /> in.
        </>,
        <A>
          <CountUp to={337} delay={14} duration={41} /> leads out.
        </A>,
      ]}
    />
    <Sub delay={26} size={24}>
      All Martell Properties Meta campaigns. The applications campaign alone ran at about CA$45 per lead.
    </Sub>
    <div style={{display: 'flex', gap: 24}}>
      <Fact delay={36} big={<><CountUp to={24} delay={36} duration={19} /> / 24</>} label="Meta leads with UTMs verified" />
      <Fact delay={42} big="event_id" label="Pixel + Conversion API, de-duplicated" />
      <Fact delay={48} big="90 days" label="click IDs kept for offline bookings" />
    </div>
  </Frame>
);

const Reporting: React.FC = () => (
  <Frame
    n={9}
    total={TOTAL}
    media={
      <Shot
        src="shots/mp-gads-01-conversions-by-action-pageview-inflation.jpg"
        srcW={1510}
        crop={{x: 378, y: 245, w: 790, h: 415}}
        width={820}
        label="Google Ads · page-view rows counted as conversions"
        delay={14}
        marks={[
          {x: 470, y: 252, w: 548, h: 28},
          {x: 470, y: 419, w: 548, h: 28},
          {x: 470, y: 622, w: 690, h: 28},
        ]}
      />
    }
  >
    <JobQuote topic="reporting">Numbers that reconcile with underlying records.</JobQuote>
    <Headline size={80} lines={['451 conversions.', '413 were', <A>page views.</A>]} />
    <div style={{display: 'flex', alignItems: 'flex-end', gap: 56}}>
      <Rise delay={26}>
        <div style={{fontFamily: F.heading, fontWeight: 800, fontSize: 72, lineHeight: 1, color: C.muted}}>
          <Strike delay={40}>CA$8</Strike>
        </div>
        <div style={{fontSize: 22, color: C.body, marginTop: 10}}>what the dashboard implied</div>
      </Rise>
      <Rise delay={48}>
        <div style={{fontFamily: F.heading, fontWeight: 800, fontSize: 72, lineHeight: 1, letterSpacing: -2}}>
          ≈ CA$<CountUp to={94} delay={48} duration={25} />
        </div>
        <div style={{fontSize: 22, color: C.body, marginTop: 10}}>true cost per lead</div>
      </Rise>
    </div>
  </Frame>
);

const Qc: React.FC = () => (
  <Frame n={10} total={TOTAL}>
    <JobQuote topic="quality control">Show what you tested, what passed, and what still needs attention.</JobQuote>
    <Headline size={104} lines={['How I prove', <A>it works.</A>]} />
    <Timeline
      delay={20}
      stops={[
        {label: 'Test submit', sub: 'every form'},
        {label: 'Fires once', sub: 'GTM preview'},
        {label: 'Lands once', sub: 'each platform'},
        {label: 'Test leads out', sub: 'pipeline + reports'},
        {label: 'Reconciled', sub: 'to source records', active: true},
      ]}
    />
    <Sub delay={52} size={28}>
      <b style={{color: C.ink}}>167 of 167</b> review fixes closed before the Martell Custom Homes launch. Every launch gets a
      written pass/fail list.
    </Sub>
  </Frame>
);

const LANDING: [string, string][] = [
  ['shots/mp-lp-building2-01-hero-desktop.jpg', 'Martell Properties'],
  ['shots/mch-lp-riverview-heights-01-hero-desktop.jpg', 'Martell Custom Homes'],
  ['shots/cc-lp-all-01-hero-desktop.jpg', 'Crazy Creek'],
];

const Delivery: React.FC = () => (
  <Frame
    n={11}
    total={TOTAL}
    media={
      <div style={{position: 'relative', width: MEDIA_W, height: 690}}>
        {LANDING.map(([src, label], i) => (
          <Shot
            key={src}
            src={src}
            srcW={1536}
            crop={{x: 0, y: 0, w: 1536, h: 770}}
            width={600}
            label={label}
            delay={12 + i * 8}
            style={{position: 'absolute', left: i * 126, top: i * 172}}
          />
        ))}
      </div>
    }
  >
    <JobQuote topic="delivery">Technical delivery across six to eight clients.</JobQuote>
    <Headline size={80} lines={['Three accounts,', <A>run in parallel.</A>]} />
    <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
      <Item head="Martell Properties." delay={22}>Inherited funnel fixed, Meta attribution wired.</Item>
      <Item head="Martell Custom Homes." delay={28}>Whole lead engine from zero.</Item>
      <Item head="Crazy Creek." delay={34}>Tracking fix, intake and booking attribution.</Item>
    </div>
    <Sub delay={42} size={24}>
      Documented systems and a knowledge base per client, so anyone on the team can pick up an account.
    </Sub>
  </Frame>
);

const Ai: React.FC = () => (
  <Frame n={12} total={TOTAL}>
    <JobQuote topic="AI tools">If you don’t know how to do something manually, you cannot automate it.</JobQuote>
    <Headline size={104} lines={['Claude Code,', <A>every day.</A>]} />
    <Sub delay={22} size={38} color={C.ink}>
      And I agree with your rule. I read the code it writes, test it on desktop and mobile, and can explain what I ship.
    </Sub>
    <Sub delay={32} size={28}>
      Built with it: a lead engine with 435 automated tests, and the tools my team runs outreach on.
    </Sub>
  </Frame>
);

const Next: React.FC = () => (
  <Frame n={13} total={TOTAL}>
    <JobQuote topic="9 am to 6 pm Mountain Time">Availability during our working hours.</JobQuote>
    <Headline size={104} lines={['Ready to own', <>your path to <A>sale.</A></>]} />
    <Sub delay={22} size={30}>
      Based in Bangladesh, working your full Mountain Time day. Funnel walkthroughs and an integration write-up are
      in my application.
    </Sub>
    <Timeline
      delay={30}
      width={1100}
      stops={[
        {label: 'Denver', sub: '9:00 am'},
        {label: 'New York', sub: '11:00 am'},
        {label: 'London', sub: '4:00 pm'},
        {label: 'Bangladesh', sub: '10:00 pm', active: true},
      ]}
    />
  </Frame>
);

export type SlideDef = {id: string; component: React.FC; duration: number; say: string};

export const SLIDES: SlideDef[] = [
  {id: 'cover', component: Cover, duration: 150, say: 'Hi, I’m Noor. Your posting opens with one line: own the path from ad click to booked call, follow-up and sale. That’s the work I do every day, on an eight-person delivery team at Get Levrg, building GoHighLevel systems for North American clients. Here’s how my work lines up with your list.'},
  {id: 'fit', component: Fit, duration: 130, say: 'This is your brief next to what I’ve shipped. One honest note: GoHighLevel is my daily tool. I know HubSpot and I’ve worked in it, just not recently, so expect a short ramp there. Now the parts that matter most, in your order.'},
  {id: 'funnels', component: Funnels, duration: 130, say: 'Funnels. For Martell Custom Homes, selling from about 380 thousand, I set up five community pages and a first-home qualifier, and built the pipeline behind them: new lead, contacted, tour booked, reserved, closed. I designed the pages too, so the design, build, forms, pipeline and tracking are all mine. That’s the qualifier page, desktop and phone.'},
  {id: 'pages', component: Pages, duration: 120, say: 'And here are the live pages across all three brands: Crazy Creek, Martell Custom Homes and Martell Properties. I designed and built these pages, and the forms, the CRM wiring and the tracking behind them are mine too.'},
  {id: 'crm', component: Crm, duration: 120, say: 'CRM. Martell Properties is an 84-unit luxury lease-up. It had 951 leads a year and nothing after the form. Five workflows built but never switched on, 45 percent of leads with no source, 99 percent of opportunities with no owner.'},
  {id: 'automations', component: Automations, duration: 130, say: 'At Martell Properties I inherited those workflows, so I fixed them instead of starting over. Now they run as one lifecycle, new lead through lease signed, with owner routing and alerts, won and lost automation, and a reactivation drip that respects consent rules. Across accounts I build intake, reminders and follow-up the same way. Crazy Creek’s intake has enrolled 111 leads. That’s the intake workflow, highlighted.'},
  {id: 'integrations', component: Integrations, duration: 130, say: 'Integrations. Crazy Creek’s Google Ads recorded no leads. It wasn’t the forms, it was a broken label lookup in Tag Manager. I fixed it and confirmed conversions in Google Ads. On Martell Properties, one form submit fires one lead event, de-duplicated across three platforms, and I caught a tag leaking between two brands. Highlighted: the GHL form listener, the one lead event, and the Meta lead tag.'},
  {id: 'attribution', component: Attribution, duration: 140, say: 'Attribution, Meta first. I manage these campaigns myself. Martell Properties’ Meta campaigns turned about 19,600 dollars into 337 leads, with the applications campaign at around 45 each and UTMs on every lead we tested. I build Conversion API events with a shared event ID, and keep click IDs for 90 days so offline bookings match back to the ad. The two highlighted rows are the campaigns that produced those leads.'},
  {id: 'reporting', component: Reporting, duration: 130, say: 'Reporting. Google Ads showed 451 conversions. 413 were page views. The dashboard implied an 8 dollar lead. The real number was about 94. I’d rather hand you the true number and the fix than a pretty dashboard. The highlighted rows are the page views being counted.'},
  {id: 'qc', component: Qc, duration: 120, say: 'Quality control. Every launch gets a written pass or fail list: real test submissions, tags firing once, events landing once per platform, test leads filtered out, numbers reconciled. On the Martell Custom Homes launch I closed 167 of 167 review fixes before handoff.'},
  {id: 'delivery', component: Delivery, duration: 120, say: 'Delivery. I run these three accounts in parallel. Everything is documented, with a knowledge base per client, so anyone on the team can pick up an account. That’s how I’d take on your six to eight.'},
  {id: 'ai', component: Ai, duration: 110, say: 'AI tools. I use Claude Code every day, including for responsive HTML and CSS, and I agree with your rule: you have to understand the work before you automate it. I read the code it writes, test it on desktop and mobile, and I can explain what I ship.'},
  {id: 'next', component: Next, duration: 150, say: 'What I want next is what your posting describes: full ownership from ad click to booked call and sale, with a team that cares whether the numbers are real. I’m in Bangladesh and I work your full 9 to 6 Mountain day. My funnel walkthroughs are in the application. Thanks for watching.'},
];
