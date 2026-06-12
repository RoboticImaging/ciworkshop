/* ================================================================
   content.js  —  NSW COMPUTATIONAL IMAGING WORKSHOP
   ================================================================
   This is the ONLY file you need to edit for text and content
   changes. No HTML or CSS knowledge required.

   STRUCTURE
   ─────────
   SITE.meta          page title, description, URL
   SITE.nav           top-bar navigation links
   SITE.hero          headline, lede, info card, badge
   SITE.about         section 01 — About
   SITE.programme     section 02 — Programme items
   SITE.topics        section 03 — Topics list
   SITE.speakers      section 04 — Speakers (placeholder text)
   SITE.committee     section 05 — People cards
   SITE.timeline      section 06 — Key dates
   SITE.footer        footer columns and colophon

   FORMATTING NOTES
   ────────────────
   • Use <em>text</em> inside strings to render italic cyan accents.
   • Use <a href="…">text</a> for links.
   • Use <br> for a line break inside a field.
   • HTML entities: &amp; = &,  &nbsp; = non-breaking space.
   • To comment out a nav link, set  enabled: false.
   • To comment out a committee member's IEEE badge, set  ieee: null.
   • To add a committee member's headshot, set  photo: 'people/name.jpg'
     (or any image path/URL). Leave  photo: null  to show no image.
     Square images work best (they're cropped to a circle).
   • To add a banner image to the hero section, set  hero.banner
     to an image path or URL (e.g. 'banner.jpg'). A dark overlay is
     applied automatically so the title text stays readable. Leave
     banner: null  for the current generative background only.
     Wide images (1600px+) work best — it's cropped to cover the
     hero area at any screen size.
   • Timeline: set  now: true  on the currently-active item.
================================================================ */

const SITE = {

  /* ─────────────────────────────────────────────────────────────
     META
  ───────────────────────────────────────────────────────────── */
  meta: {
    title:       'NSW Computational Imaging Workshop — 16 February 2027',
    description: 'The inaugural NSW Computational Imaging Workshop. A regional forum for researchers, engineers and students working at the intersection of optics, sensing and computation. Greater Sydney, 16 February 2027.',
    ogTitle:     'NSW Computational Imaging Workshop',
    ogDesc:      'Inaugural regional forum for computational imaging research in NSW & the ACT. Free to attend. 16 February 2027.',
    url:         'https://ciworkshop.au',
  },

  /* ─────────────────────────────────────────────────────────────
     TOP-BAR NAVIGATION
     Set enabled: false to hide a link without deleting it.
  ───────────────────────────────────────────────────────────── */
  nav: {
    mark: 'NSW · Computational Imaging Workshop',
    links: [
      { label: 'About',      href: '#about',      enabled: true  },
      { label: 'Programme',  href: '#programme',  enabled: true  },
      { label: 'Topics',     href: '#topics',     enabled: true  },
      { label: 'Committee',  href: '#committee',  enabled: true  },
      { label: 'Get involved', href: '#involved', enabled: false },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     HERO
  ───────────────────────────────────────────────────────────── */
  hero: {
    eyebrow: 'Inaugural edition · NSW &amp; ACT',
    title:   'A regional forum for <em>computational imaging</em>.',
    lede:    'One day in Sydney for the people designing optics, sensors and algorithms together — from inverse problems and Fourier methods to event cameras and end-to-end optics.',

    /* Banner image behind the hero section, with a dark overlay
       applied automatically (see style.css .has-banner). */
    banner: 'CameraPrototypeWithAlignmentLaser.jpg',

    /* info card (right side) */
    card: [
      { label: 'Date',   value: '16 February 2027' },
      { label: 'Where',  value: 'Greater Sydney<br><span style="color:var(--muted)">USyd / WSU Westmead (TBC Aug&nbsp;2026)</span>' },
      { label: 'Format', value: 'Talks, breakouts,<br>posters, council' },
      { label: 'Cost',   value: '—' },
    ],
    badge: 'Free to attend',
  },

  /* ─────────────────────────────────────────────────────────────
     SECTION 01 — ABOUT
  ───────────────────────────────────────────────────────────── */
  about: {
    num:   '01',
    label: 'About',
    title: 'Computational imaging deserves <em>a room of its own</em>.',

    /* First paragraph uses the larger "lead" style. */
    paragraphs: [
      {
        lead: true,
        text: 'Computational imaging is the co-design of optics, sensors, mathematics and computing to extract information from light beyond what traditional cameras afford. The field underpins advances in  medical imaging, astronomy, space, and robotics.'
      },
      {
        text: 'Australian optics and photonics research is thriving. But optical engineering and computational imaging does not receive the same institutional recognition or structured teaching as in the US or Europe. The result is  a structural gap: people working on imaging systems across research and industry share few formal community touchpoints. This workshop is a deliberate attempt to everyone in the community into one room.'
      },
      {
        text: 'A direct precedent is <a href="https://bracewell.science" target="_blank" rel="noopener">Bracewell@70</a> (Macquarie, 2025), which marked seventy years since Ron Bracewell\'s foundational contributions to Fourier methods in imaging. It drew attendees from astronomy, medical imaging, robotics, signal processing and optics, demonstrating clear appetite for focused cross-disciplinary events.',
      },
    ],
  },
  /* ─────────────────────────────────────────────────────────────
     SECTION 02 — TOPICS
  ───────────────────────────────────────────────────────────── */
  topics: {
    num:   '02',
    label: 'Topics',
    title: 'What we\'ll cover.',

    /* Roman numerals are generated automatically — just list the names. */
    items: [
      'Inverse problems &amp; image reconstruction',
      'Diffractive &amp; Fourier optics',
      'Neuromorphic &amp; event-based sensing',
      'Biomedical &amp; astronomical imaging',
      'Translational research &amp; industry impact',
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     SECTION 03 — TIMELINE
     now: true  →  highlighted row (current period)
  ───────────────────────────────────────────────────────────── */
  timeline: {
    num:   '03',
    label: 'Timeline',
    title: 'Key dates.',

    items: [
      { when: 'June–July 2026',  what: 'Venue confirmation · early-joiner social dinner', now: true  },
      { when: 'August 2026',     what: 'Speaker invitations · workshop topic leads identified · Community Council mailing list established', now: false },
      { when: 'Sept–Oct 2026',   what: 'Website live · event announced · call for poster abstracts opens · Council agenda circulated', now: false },
      { when: 'November 2026',   what: 'Speaker programme confirmed and published', now: false },
      { when: 'January 2027',    what: 'Catering and logistics confirmed · poster submission deadline', now: false },
      { when: '16 Feb 2027',     what: '<strong>Event held</strong> — Greater Sydney', now: false },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     SECTION 04 — PROGRAMME
  ───────────────────────────────────────────────────────────── */
  programme: {
    num:   '04',
    label: 'Programme',
    title: 'A full day, built for <em>depth and exchange</em>.',

    items: [
      {
        label: 'Invited talks',
        heading: 'Plenary talks from <em>Australian leaders</em> in the field',
        text:    'A curated set of invited talks covering the breadth of computational imaging — from optical hardware to reconstruction algorithms to translational impact.',
      },
      {
        label: 'Breakouts',
        heading: 'Topic-focused <em>technical workshops</em>',
        text:    'Smaller breakout sessions on diffractive optics, neuromorphic sensing, and imaging system modelling, enabling depth beyond a standard talk.',
      },
      {
        label: 'Posters',
        heading: 'Student &amp; early-career <em>poster session</em>',
        text:    'A dedicated session for student and ECR work. Open call for abstracts will be announced in late 2026.',
      },
      {
        label: 'Council',
        heading: 'Inaugural Australian Computational Imaging <em>Community Council</em>',
        text:    'A structured meeting to set community priorities, long-term direction, and pathways to translational impact. The council established here will take responsibility for governance of subsequent editions.',
      },
      {
        label: 'Panel',
        heading: 'Closing panel: <em>emerging directions</em>',
        text:    'An open discussion on where the field, and the Australian community, should head next.',
      },
      {
        label: 'Social',
        heading: 'Informal evening <em>at a nearby venue</em>',
        text:    'Continued conversation, less formal. Details closer to the event.',
      },
    ],
  },



  /* ─────────────────────────────────────────────────────────────
     SECTION 05 — SPEAKERS
  ───────────────────────────────────────────────────────────── */
  speakers: {
    num:   '05',
    label: 'Speakers',
    title: 'Invitations are <em>in flight</em>.',

    text: 'Speaker invitations are being extended to prominent Australian-based figures in computational imaging. Confirmed names will be listed here as responses come in. We expect to publish the speaker programme in November 2026.',

    /* Uncomment and populate when ready:
    disclosure: {
      heading: 'Under invitation or expressed initial interest:',
      names:   'Prof. Arti Agrawal (UTS) · Prof. Peter Tuthill (USyd) · Prof. Maryanne Large (USyd) · Prof. Paul Hurley (WSU)',
    },
    */
    disclosure: null,
  },

  /* ─────────────────────────────────────────────────────────────
     SECTION 06 — COMMITTEE
     ieee: null   →  no badge shown
     ieee: 'IEEE SPS Member'  →  badge shown
  ───────────────────────────────────────────────────────────── */
  committee: {
    num:   '06',
    label: 'Committee',
    title: 'The organising team.',

    people: [
      {
        name: 'Dr. Donald Dansereau',
        role: 'Univ. of Sydney',
        bio:  'Computational imaging, robotic imaging and perception.',
        ieee: 'IEEE SPS Member',
        photo: 'people/DonaldDansereau.jpg',
      },
      {
        name: 'A/Prof. Benjamin Pope',
        role: 'Macquarie University',
        bio:  'Astronomical imaging, Fourier optics. Organiser of Bracewell@70.',
        ieee: null,
        photo: 'people/BenjaminPope.jpeg',
      },
      {
        name: 'Dr. Jennifer Wakulicz',
        role: 'Univ. of Sydney',
        bio:  'Perception, probabilistic modelling, information theory.',
        ieee: 'IEEE Member',
        photo: 'people/JenniferWakulicz.jpeg',
      },
      {
        name: 'Dr. James Gray',
        role: 'Univ. of Sydney',
        bio:  'Computational imaging, light field imaging, 3D reconstruction.',
        ieee: 'IEEE SPS Member',
        photo: 'people/JamesGray.jpeg',
      },
      {
        name: 'Dr. Nimrod Kruger',
        role: 'Western Sydney University',
        bio:  'Computational imaging, event-based sensing.',
        ieee: null,
        photo: 'people/NimrodKruger.jpeg',
      },
    ],
  },



  /* ─────────────────────────────────────────────────────────────
     SECTION 07 — GET INVOLVED  (currently hidden)
     To enable this section, set  enabled: true  and uncomment
     the nav link above.
  ───────────────────────────────────────────────────────────── */
  involved: {
    enabled: false,
    num:   '07',
    label: 'Get involved',
    title: 'Three ways to <em>take part</em>.',

    cards: [
      {
        heading: 'Present a poster',
        text:    'Open to PhD students and early-career researchers across NSW and the ACT. Best contributions awarded. Call for abstracts opens late 2026.',
        action:  { label: 'Register your interest →', href: 'mailto:posters@ciworkshop.au' },
      },
      {
        heading: 'Join the Community Council',
        text:    'Help shape what computational imaging looks like as a community in Australia. The Council convenes at the workshop and continues year-round.',
        action:  { label: 'Add me to the list →', href: 'mailto:council@ciworkshop.au' },
      },
      {
        heading: 'Sponsor the event',
        text:    'External sponsorship enables venue upgrades, expanded participation, recording, and travel support for students. Sponsor briefings on request.',
        action:  { label: 'Sponsor briefing →', href: 'mailto:sponsors@ciworkshop.au' },
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     FOOTER
  ───────────────────────────────────────────────────────────── */
  footer: {
    columns: [
      {
        heading: 'The Workshop',
        lines: [
          'A regional forum for computational imaging research across New South Wales and the Australian Capital Territory.',
          '<a href="mailto:hello@ciworkshop.au">hello@ciworkshop.au</a>',
        ],
      },
      /* Sponsorship column — uncomment when needed:
      {
        heading: 'Sponsorship',
        lines: [
          'Sponsorship application submitted to the IEEE Signal Processing Society Member Driven Initiative programme, 2027 Cycle 2.',
          'Hosted in coordination with the NSW IEEE SPS Regional Chapter.',
        ],
      },
      */
      {
        heading: 'Elsewhere',
        lines: [
          '<a href="https://bracewell.science" target="_blank" rel="noopener">Bracewell@70</a>',
          /* '<a href="https://signalprocessingsociety.org" target="_blank" rel="noopener">IEEE SPS</a>', */
        ],
      },
    ],

    colophon: {
      left:  '© 2026 NSW Computational Imaging Workshop · ciworkshop.au',
      right: 'Set in Inter &amp; Source Serif',
    },
  },

};
