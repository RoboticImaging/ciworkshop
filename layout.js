/* ================================================================
   layout.js  —  DOM BUILDER
   ================================================================
   Reads the SITE object defined in content.js and constructs the
   full page DOM. You should not need to edit this file for routine
   content changes. Edit it only when adding a new section type or
   changing the HTML structure of an existing component.

   SECTION RENDERERS (one function per section):
     renderNav()        top bar
     renderHero()       hero with aperture motif
     renderAbout()      section 01
     renderProgramme()  section 02
     renderTopics()     section 03
     renderSpeakers()   section 04
     renderCommittee()  section 05
     renderTimeline()   section 06
     renderInvolved()   section 07 (hidden by default)
     renderFooter()     footer
================================================================ */

(function () {
  'use strict';

  /* ── utility ─────────────────────────────────────────────── */

  /** Create an element, assign classes and innerHTML in one call. */
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls)  e.className   = cls;
    if (html) e.innerHTML   = html;
    return e;
  }

  /** Wrap content in the standard section-head grid. */
  function sectionHead(num, label, title) {
    const head = el('div', 'section-head');
    head.appendChild(el('div', 'section-label', `<span class="num">${num}</span>${label}`));
    head.appendChild(el('h2', 'section-title', title));
    return head;
  }

  /* ── coded-aperture SVG motif (hero decoration) ───────────── */
  const APERTURE_SVG = `
    <svg class="aperture" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="#7ec4e3">
        <rect x="0" y="0" width="1" height="1"/><rect x="2" y="0" width="1" height="1"/><rect x="3" y="0" width="1" height="1"/><rect x="6" y="0" width="1" height="1"/><rect x="8" y="0" width="1" height="1"/>
        <rect x="1" y="1" width="1" height="1"/><rect x="4" y="1" width="1" height="1"/><rect x="5" y="1" width="1" height="1"/><rect x="7" y="1" width="1" height="1"/><rect x="10" y="1" width="1" height="1"/>
        <rect x="0" y="2" width="1" height="1"/><rect x="3" y="2" width="1" height="1"/><rect x="5" y="2" width="1" height="1"/><rect x="6" y="2" width="1" height="1"/><rect x="9" y="2" width="1" height="1"/>
        <rect x="2" y="3" width="1" height="1"/><rect x="4" y="3" width="1" height="1"/><rect x="7" y="3" width="1" height="1"/><rect x="8" y="3" width="1" height="1"/><rect x="10" y="3" width="1" height="1"/>
        <rect x="0" y="4" width="1" height="1"/><rect x="1" y="4" width="1" height="1"/><rect x="5" y="4" width="1" height="1"/><rect x="9" y="4" width="1" height="1"/>
        <rect x="2" y="5" width="1" height="1"/><rect x="3" y="5" width="1" height="1"/><rect x="6" y="5" width="1" height="1"/><rect x="8" y="5" width="1" height="1"/><rect x="10" y="5" width="1" height="1"/>
        <rect x="0" y="6" width="1" height="1"/><rect x="4" y="6" width="1" height="1"/><rect x="7" y="6" width="1" height="1"/><rect x="9" y="6" width="1" height="1"/>
        <rect x="1" y="7" width="1" height="1"/><rect x="3" y="7" width="1" height="1"/><rect x="5" y="7" width="1" height="1"/><rect x="8" y="7" width="1" height="1"/>
        <rect x="0" y="8" width="1" height="1"/><rect x="2" y="8" width="1" height="1"/><rect x="6" y="8" width="1" height="1"/><rect x="7" y="8" width="1" height="1"/><rect x="10" y="8" width="1" height="1"/>
        <rect x="3" y="9" width="1" height="1"/><rect x="4" y="9" width="1" height="1"/><rect x="8" y="9" width="1" height="1"/><rect x="9" y="9" width="1" height="1"/>
        <rect x="1" y="10" width="1" height="1"/><rect x="2" y="10" width="1" height="1"/><rect x="5" y="10" width="1" height="1"/><rect x="6" y="10" width="1" height="1"/><rect x="9" y="10" width="1" height="1"/>
      </g>
    </svg>`;

  /* ── section renderers ───────────────────────────────────── */

  function renderNav(d) {
    const header = el('header', 'topbar');
    header.appendChild(el('div', 'mark', d.mark));

    const nav = el('nav');
    d.links.forEach(link => {
      if (!link.enabled) return;
      const a = el('a');
      a.href      = link.href;
      a.innerHTML = link.label;
      nav.appendChild(a);
    });
    header.appendChild(nav);
    return header;
  }

  function renderHero(d) {
    const section = el('section', 'hero');
    if (d.banner) {
      section.classList.add('has-banner');
      section.style.backgroundImage = `url('${d.banner}')`;
    }
    section.innerHTML = APERTURE_SVG;
    section.appendChild(el('div', 'eyebrow', d.eyebrow));

    const grid = el('div', 'hero-grid');

    /* left column */
    const left = el('div');
    left.appendChild(el('h1', 'title', d.title));
    left.appendChild(el('p', 'lede', d.lede));
    grid.appendChild(left);

    /* right — info card */
    const aside = el('aside', 'hero-meta');
    let dl = el('dl');
    d.card.forEach(row => {
      if (row.section) {
        if (dl.children.length) aside.appendChild(dl);
        aside.appendChild(el('p', 'card-section-head', row.label));
        dl = el('dl');
      } else {
        dl.appendChild(el('dt', null, row.label));
        dl.appendChild(el('dd', null, row.value));
      }
    });
    if (dl.children.length) aside.appendChild(dl);
    aside.appendChild(el('span', 'free-badge', d.badge));
    grid.appendChild(aside);

    section.appendChild(grid);
    return section;
  }

  function renderAbout(d) {
    const section = el('section', null);
    section.id = 'about';
    section.appendChild(sectionHead(d.num, d.label, d.title));

    const body  = el('div', 'section-body');
    body.appendChild(el('div'));          /* empty left column */
    const prose = el('div', 'prose');
    d.paragraphs.forEach(p => {
      prose.appendChild(el('p', p.lead ? 'lead' : null, p.text));
    });
    body.appendChild(prose);
    section.appendChild(body);
    return section;
  }

  function renderTopics(d) {
    const NUMERALS = ['i.','ii.','iii.','iv.','v.','vi.','vii.','viii.','ix.','x.'];
    const section = el('section', null);
    section.id = 'topics';
    section.appendChild(sectionHead(d.num, d.label, d.title));

    const ul = el('ul', 'topics');
    d.items.forEach((name, i) => {
      const li = el('li');
      li.appendChild(el('span', 'topic-num', NUMERALS[i] || `${i+1}.`));
      li.appendChild(el('span', 'topic-name', name));
      ul.appendChild(li);
    });
    section.appendChild(ul);
    return section;
  }

  function renderTimeline(d) {
    const section = el('section', null);
    section.id = 'timeline';
    section.appendChild(sectionHead(d.num, d.label, d.title));

    const ul = el('ul', 'timeline');
    d.items.forEach(item => {
      const li = el('li', item.now ? 'now' : null);
      li.appendChild(el('span', 'when', item.when));
      li.appendChild(el('span', 'what', item.what));
      ul.appendChild(li);
    });
    section.appendChild(ul);
    return section;
  }

  function renderProgramme(d) {
    const section = el('section', null);
    section.id = 'programme';
    section.appendChild(sectionHead(d.num, d.label, d.title));

    const list = el('div', 'programme');
    d.items.forEach(item => {
      const row = el('div', 'programme-item');
      row.appendChild(el('div', 'pi-label', item.label));
      const body = el('div');
      body.appendChild(el('h3', null, item.heading));
      body.appendChild(el('p', null, item.text));
      row.appendChild(body);
      list.appendChild(row);
    });
    section.appendChild(list);
    return section;
  }

  function renderSpeakers(d) {
    const section = el('section', null);
    section.id = 'speakers';
    section.appendChild(sectionHead(d.num, d.label, d.title));

    /* Confirmed speakers: single-column horizontal rows (photo + blurb),
       same visual language as #committee but one column, not a grid.
       Wrapped in the same .section-body grid as the prose above so the
       rows line up with the prose's left margin, not the section edge. */
    if (d.people && d.people.length) {
      if (d.text) {
        const introBody  = el('div', 'section-body');
        introBody.appendChild(el('div'));
        const prose = el('div', 'prose');
        prose.appendChild(el('p', null, d.text));
        introBody.appendChild(prose);
        section.appendChild(introBody);
      }

      const listBody = el('div', 'section-body');
      listBody.appendChild(el('div'));
      const list = el('div', 'speakers-list');
      d.people.forEach(p => {
        const row = el('div', 'speaker-row');
        if (p.photo) {
          const img = el('img', 'speaker-photo');
          img.src = p.photo;
          img.alt = p.name;
          row.appendChild(img);
        }
        const speakerBody = el('div', 'speaker-body');
        speakerBody.appendChild(el('div', 'name', p.name));
        speakerBody.appendChild(el('div', 'role', p.role));
        speakerBody.appendChild(el('div', 'bio',  p.bio));
        if (p.ieee) speakerBody.appendChild(el('span', 'ieee', p.ieee));
        row.appendChild(speakerBody);
        list.appendChild(row);
      });
      listBody.appendChild(list);
      section.appendChild(listBody);
      return section;
    }

    /* Placeholder state: no confirmed speakers yet. */
    const body  = el('div', 'section-body');
    body.appendChild(el('div'));
    const prose = el('div', 'prose');
    prose.appendChild(el('p', null, d.text));

    if (d.disclosure) {
      const disc = el('div', 'disclosure');
      disc.innerHTML = `<strong>${d.disclosure.heading}</strong><br>${d.disclosure.names}`;
      prose.appendChild(disc);
    }
    body.appendChild(prose);
    section.appendChild(body);
    return section;
  }

  function renderCommittee(d) {
    const section = el('section', null);
    section.id = 'committee';
    section.appendChild(sectionHead(d.num, d.label, d.title));

    const grid = el('div', 'people');
    d.people.forEach(p => {
      const card = el('div', 'person');
      if (p.photo) {
        const img = el('img', 'person-photo');
        img.src = p.photo;
        img.alt = p.name;
        card.appendChild(img);
      }
      card.appendChild(el('div', 'name', p.name));
      card.appendChild(el('div', 'role', p.role));
      card.appendChild(el('div', 'bio',  p.bio));
      if (p.ieee) card.appendChild(el('span', 'ieee', p.ieee));
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function renderInvolved(d) {
    if (!d.enabled) return null;

    const section = el('section', null);
    section.id = 'involved';
    section.appendChild(sectionHead(d.num, d.label, d.title));

    const grid = el('div', 'cta-grid');
    d.cards.forEach(card => {
      const cta = el('div', 'cta');
      cta.appendChild(el('h3', null, card.heading));
      cta.appendChild(el('p', null, card.text));
      const a = el('a', 'cta-action', card.action.label);
      a.href = card.action.href;
      cta.appendChild(a);
      grid.appendChild(cta);
    });
    section.appendChild(grid);
    return section;
  }

  function renderFooter(d) {
    const footer = el('footer');
    const wrap   = el('div', 'wrap');
    const grid   = el('div', 'foot-grid');

    d.columns.forEach(col => {
      const div = el('div');
      div.appendChild(el('h4', null, col.heading));
      col.lines.forEach((line, i) => {
        const p = el('p', null, line);
        if (i > 0) p.style.marginTop = '14px';
        div.appendChild(p);
      });
      grid.appendChild(div);
    });

    wrap.appendChild(grid);

    const colophon = el('div', 'colophon');
    colophon.appendChild(el('div', null, d.colophon.left));
    colophon.appendChild(el('div', null, d.colophon.right));
    wrap.appendChild(colophon);

    footer.appendChild(wrap);
    return footer;
  }

  /* ── assemble page ───────────────────────────────────────── */

  function build() {
    const app  = document.getElementById('app');
    const wrap = el('div', 'wrap');

    wrap.appendChild(renderNav(SITE.nav));
    wrap.appendChild(renderHero(SITE.hero));
    wrap.appendChild(renderAbout(SITE.about));
    wrap.appendChild(renderTopics(SITE.topics));
    wrap.appendChild(renderTimeline(SITE.timeline));
    wrap.appendChild(renderProgramme(SITE.programme));
    wrap.appendChild(renderSpeakers(SITE.speakers));
    wrap.appendChild(renderCommittee(SITE.committee));

    const involved = renderInvolved(SITE.involved);
    if (involved) wrap.appendChild(involved);

    app.appendChild(wrap);
    app.appendChild(renderFooter(SITE.footer));
  }

  build();

})();
