/* ================================================================
   visual.js  —  GENERATIVE VISUAL LAYER
   ================================================================
   Author contribution: Nimrod Kruger (WSU / ICNS)

   This file is self-contained and independent of content.js and
   layout.js. It mounts two purely visual elements that sit behind
   the page text:

   1. STF BACKGROUND CANVAS  ──────────────────────────────────────
      A fixed full-viewport canvas rendering a superposition of N
      sinusoidal plane-wave gratings. All grating parameters vary
      linearly with scroll position. Phase is accumulated via a
      running integrator (not analytically from scroll), so
      scrolling never causes a phase discontinuity.

      TUNING PARAMETERS (search for "★ TUNE"):
        N_COMP        number of superimposed components
        f0 range      spatial frequency at scroll = 0  (cy/px)
        df range      Δfrequency from scroll 0 → 1
        spd0 range    phase drift speed (rad/ms), constant
        AMPLITUDE     peak pixel value delta (±DN)
        SCROLL_SCALE  scroll sensitivity (1.0 = full, 0.8 = −20%)
        STF_FPS       canvas redraw rate (frames/sec)

   2. LENS RIG  ───────────────────────────────────────────────────
      Three instances of lens.png in a fixed right-column stack.
      Top and bottom lenses are full size; middle is half size.
      Vertical displacement is driven by scroll via sine functions:
        top:    half-cycle  (0 → π)     — away then back
        bottom: 3/4-cycle   (0 → 1.5π)  — away, back, away

      TUNING PARAMETERS (search for "★ TUNE"):
        LENS_SIZE_LARGE   px, top and bottom lenses
        LENS_SIZE_SMALL   px, middle lens
        LENS_GAP          px, resting margin around middle lens
        RIG_WIDTH         px, width of the fixed right column
        AMP_TOP           px, max travel of top lens
        AMP_BOT           px, max travel of bottom lens
        BREAKPOINT        px viewport width below which rig hides

   NOTE ON Z-ORDER
      Canvas:   z-index 0  (deepest)
      Lens rig: z-index 1  (above canvas, below page text)
      Page text (.wrap, footer): z-index 2  (topmost)
================================================================ */

(function () {
  'use strict';

  /* ════════════════════════════════════════════════════════════
     1. STF BACKGROUND CANVAS
  ════════════════════════════════════════════════════════════ */

  /* ── ★ TUNE: canvas parameters ─── */
  const N_COMP      = 6;      /* number of superimposed plane-wave components     */
  const AMPLITUDE   = 10;     /* ±DN  peak pixel value delta                      */
  const SCROLL_SCALE = 0.8;   /* scroll sensitivity: 1.0 = full range, 0.8 = −20% */
  const STF_FPS     = 12;     /* canvas redraws per second (~12 is smooth enough)  */

  /* ── ★ TUNE: per-component parameter ranges (seeded once at load) ── */
  /* All values are uniform random draws from [lo, hi].                 */
  const COMP_RANGES = {
    angle: [0,       Math.PI],   /* wave propagation direction (rad)               */
    f0:    [0.0015,  0.005  ],   /* spatial frequency at scroll=0 (cycles/px)      */
    df:    [0.008,   0.022  ],   /* Δspatial frequency over full scroll range       */
    spd0:  [0.0004,  0.0010 ],   /* phase drift speed (rad/ms), scroll-independent  */
    w:     [0.5,     1.0    ],   /* component weight before normalisation           */
  };

  /* ── background base colour — must match --bg in style.css ── */
  const BG_R = 14, BG_G = 16, BG_B = 20;   /* #0e1014 */

  /* ── mount canvas ─── */
  const canvas = document.createElement('canvas');
  canvas.id             = 'stf-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position:      'fixed',
    inset:         '0',
    width:         '100%',
    height:        '100%',
    pointerEvents: 'none',
    zIndex:        '0',
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, imgData, buf32;

  function resizeCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    imgData = ctx.createImageData(W, H);
    buf32   = new Uint32Array(imgData.data.buffer);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  /* ── seed components ─── */
  const rng  = (lo, hi) => lo + Math.random() * (hi - lo);
  const R    = COMP_RANGES;

  const comps = Array.from({ length: N_COMP }, () => ({
    angle: rng(...R.angle),
    f0:    rng(...R.f0),
    df:    rng(...R.df),
    spd0:  rng(...R.spd0),
    w:     rng(...R.w),
    phase: 0,                  /* running phase accumulator (rad) */
  }));

  /* normalise weights so peak superposition ≈ 1 */
  const wSum = comps.reduce((a, c) => a + c.w, 0);
  comps.forEach(c => c.w /= wSum);

  /* precompute trig per component (static — angle never changes) */
  const cosA = comps.map(c => Math.cos(c.angle));
  const sinA = comps.map(c => Math.sin(c.angle));

  /* ── scroll helper ─── */
  function scrollProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? window.scrollY / max : 0;
  }

  /* ── render one frame ─── */
  let lastT = null;
  const STF_INTERVAL = 1000 / STF_FPS;

  function drawSTF(t) {
    /* advance phase accumulators using elapsed wall-clock time */
    if (lastT !== null) {
      const dt = t - lastT;
      for (let k = 0; k < N_COMP; k++) {
        comps[k].phase += comps[k].spd0 * dt;
      }
    }
    lastT = t;

    const s  = scrollProgress();
    const s_ = s * SCROLL_SCALE;   /* reduced scroll sensitivity */

    /* grating origin at viewport centre — "zero crossing" stays centred */
    const cx = W * 0.5;
    const cy = H * 0.5;

    for (let y = 0; y < H; y++) {
      const dy = y - cy;
      for (let x = 0; x < W; x++) {
        const dx = x - cx;
        let val = 0;
        for (let k = 0; k < N_COMP; k++) {
          const f    = comps[k].f0 + s_ * comps[k].df;   /* linear in scroll */
          const proj = dx * cosA[k] + dy * sinA[k];
          val += comps[k].w * Math.sin(2 * Math.PI * f * proj + comps[k].phase);
        }
        const d = (val * AMPLITUDE) | 0;
        /* pack ABGR (little-endian canvas) */
        buf32[y * W + x] = (0xff000000)
          | (Math.min(255, Math.max(0, BG_B + d + 2)) << 16)   /* slight cyan bias */
          | (Math.min(255, Math.max(0, BG_G + d))     <<  8)
          |  Math.min(255, Math.max(0, BG_R + d));
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  /* ════════════════════════════════════════════════════════════
     2. LENS RIG
  ════════════════════════════════════════════════════════════ */

  /* ── ★ TUNE: lens rig parameters ─── */
  const LENS_SIZE_LARGE = 180;   /* px — top and bottom lens diameter  */
  const LENS_SIZE_SMALL =  90;   /* px — middle lens diameter          */
  const LENS_GAP        =  12;   /* px — resting margin around middle  */
  const RIG_WIDTH       = 220;   /* px — fixed column width            */
  const AMP_TOP         =  60;   /* px — max vertical travel, top lens */
  const AMP_BOT         =  60;   /* px — max vertical travel, bot lens */
  const BREAKPOINT      = 900;   /* px — hide rig below this width     */

  /* ── mount rig ─── */
  const rig = document.createElement('div');
  rig.id = 'lens-rig';
  Object.assign(rig.style, {
    position:       'fixed',
    right:          '0',
    top:            '0',
    width:          `${RIG_WIDTH}px`,
    height:         '100vh',
    pointerEvents:  'none',
    zIndex:         '1',
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    justifyContent: 'center',
  });

  function makeLens(size, extraStyle) {
    const img = document.createElement('img');
    img.src = 'lens.png';
    img.alt = '';
    Object.assign(img.style, {
      width:        `${size}px`,
      height:       `${size}px`,
      objectFit:    'contain',
      display:      'block',
      willChange:   'transform',
      ...extraStyle,
    });
    return img;
  }

  const lensTop = makeLens(LENS_SIZE_LARGE, {});
  const lensMid = makeLens(LENS_SIZE_SMALL, { margin: `${LENS_GAP}px 0` });
  const lensBot = makeLens(LENS_SIZE_LARGE, {});

  rig.appendChild(lensTop);
  rig.appendChild(lensMid);
  rig.appendChild(lensBot);
  document.body.appendChild(rig);

  /* responsive hide */
  const rigStyle = document.createElement('style');
  rigStyle.textContent = `@media (max-width: ${BREAKPOINT}px) { #lens-rig { display: none !important; } }`;
  document.head.appendChild(rigStyle);

  /* ── scroll-driven lens motion ─── */
  function updateLenses() {
    const s = scrollProgress();

    /* top:    half sine cycle  (0 → π) — away (upward) then back */
    const yTop = -AMP_TOP * Math.sin(s * Math.PI);

    /* bottom: 3/4 sine cycle  (0 → 1.5π) — away, back, away */
    const yBot =  AMP_BOT * Math.sin(s * 1.5 * Math.PI);

    lensTop.style.transform = `translateY(${yTop.toFixed(2)}px)`;
    lensBot.style.transform = `translateY(${yBot.toFixed(2)}px)`;
    /* middle lens is the fixed reference — no transform applied */
  }

  /* ════════════════════════════════════════════════════════════
     3. ANIMATION LOOP
  ════════════════════════════════════════════════════════════ */

  let lastSTF = 0;

  function loop(t) {
    /* canvas redraws at STF_FPS to keep CPU load acceptable */
    if (t - lastSTF > STF_INTERVAL) {
      drawSTF(t);
      lastSTF = t;
    }
    /* lens position updates every frame (cheap — CSS transform only) */
    updateLenses();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  /* ════════════════════════════════════════════════════════════
     4. Z-INDEX GUARD
     Ensures page content always sits above both visual layers.
  ════════════════════════════════════════════════════════════ */
  const zGuard = document.createElement('style');
  zGuard.textContent = `
    .wrap, footer { position: relative; z-index: 2; }
  `;
  document.head.appendChild(zGuard);

})();
