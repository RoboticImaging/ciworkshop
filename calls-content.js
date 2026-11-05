/* Draft calls page. Edit the text below as the calls are finalised.
   Shared workshop branding and event details come from content.js.
   Replace each inactive submission span with a link when ready. */
SITE.calls = {
  sections: [
    {
      id: 'posters', num: '01', label: 'Posters',
      title: 'Call for <em>posters</em>.',
      paragraphs: [
        { lead: true, text: 'Share your research with the computational imaging community.' },
        { text: 'We aim for lively discussions and the opportunity to engage with the people behind the research. There will be several poster sessions, each limited to only several presentors at a time - so your work will get maximal attention.' },
        { text: 'Scope: anything computational imaging related.' },
        { text: 'Poster format: digital presentation. Only share the file.' },
        { text: 'Submission: Abstract by [date]. If selected: full poster submission by [date].' },
        { text: '<span aria-disabled="true">Submit your poster abstract here (submissions not yet open).</span>' },
      ],
    },
    {
      id: 'workshops', num: '02', label: 'Workshops',
      title: 'Call for <em>workshops</em>.',
      paragraphs: [
        { lead: true, text: 'Propose a workshop to share knowledge, upskill members, or bridge disciplines.' },
        { text: 'A 3 hour window during day 2 of the meeting will be allocated for various workshops. Up to 6 workshops will be selected from the submitted proposals and will be held during that time.' },
        { text: 'The aim of the community initiated workshops is to foster collaboration across diciplines - so workshops around tranfarable methods are encouraged. We also favor propsals organised by cross-institute teams, and those including hands-on interaction by workshop participants - though not required' },
        { text: 'Let us know what you need to make your workshop successful, and we will do our best to accommodate.' },
        { text: 'Submission deadline by [date], and notification date by [date].' },
        { text: '<span aria-disabled="true">Submit your workshop proposal here (submissions not yet open).</span>' },
      ],
    },
  ],
};

SITE.nav = {
  mark: SITE.nav.mark,
  links: [
    { label: 'Workshop home', href: 'index.html', enabled: true },
    { label: 'Posters', href: '#posters', enabled: true },
    { label: 'Workshops', href: '#workshops', enabled: true },
  ],
};

SITE.hero = {
  ...SITE.hero,
  eyebrow: 'Calls · Details forthcoming',
  title: 'Call for posters<br>and <em>workshops</em>.',
  lede: 'Contribute to the Australian Computational Imaging Workshop. Call details are being prepared; check back for requirements and key dates.<br><a href="index.html">Return to the main workshop page &rarr;</a>',
  badge: null,
  submit: null,
};

