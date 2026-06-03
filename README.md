# ciworkshop.au

Static site for the NSW Computational Imaging Workshop, 16 February 2027.

## Files

- 'layout.js' - the various sections and structure of the webpage 
- 'contents.js' - text related to each layer section
- 'style.css' - webpage design
- 'visual.js' - fun visuals embeded in the page
- `index.html` — the site construction
- `CNAME` — tells GitHub Pages to serve at `ciworkshop.au`
  (additional files: lens.png -used by visual.js)

## Deploy on GitHub Pages

1. **Create a repo.** Public is simplest (free Pages on any plan). Name it whatever — `ciworkshop`, `nsw-ci-workshop`, etc.

2. **Push these files** to the repo root, on `main`.

3. **Enable Pages.** Repo → *Settings* → *Pages* → Source: *Deploy from a branch* → Branch: `main` → Folder: `/ (root)` → Save.

4. **Add the custom domain.** Same page, *Custom domain*: `ciworkshop.au` → Save. Tick *Enforce HTTPS* once the cert provisions (a few minutes after DNS resolves).

5. **Point DNS at GitHub.** At your `.au` registrar (VentraIP / Crazy Domains / Netregistry), add these records on the apex `ciworkshop.au`:

   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   AAAA  @     2606:50c0:8000::153
   AAAA  @     2606:50c0:8001::153
   AAAA  @     2606:50c0:8002::153
   AAAA  @     2606:50c0:8003::153
   ```

   And optionally a `www` subdomain:
   ```
   CNAME www   <your-github-username>.github.io.
   ```

   Worth re-checking these IPs against the [GitHub Pages docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) on the day you set it up — they're stable but GitHub updates the list occasionally.

6. **Wait.** DNS propagation is usually under an hour for `.au`. GitHub then auto-provisions a Let's Encrypt cert.

## Alternative: Cloudflare Pages

If you'd rather use Cloudflare (faster, free, easier DNS if the domain is already on Cloudflare):

1. Push to GitHub as above.
2. Cloudflare dash → *Workers & Pages* → *Create* → *Pages* → *Connect to Git*.
3. Pick the repo. Build command: *(none)*. Output directory: `/`.
4. Add `ciworkshop.au` as a custom domain. If the domain is already on Cloudflare, DNS auto-configures.

Cloudflare Pages also gives you a free preview URL on every push.

## Editing

Single file. Open `index.html`, edit, push. Sections are marked with comments — `<!-- ——— hero -->`, `<!-- ——— programme -->`, etc.

To add confirmed speakers, replace the `disclosure` block inside the `#speakers` section with proper cards (the `.person` pattern from `#committee` works well).

## Notes

- No build step, no node, no framework. Just HTML + CSS.
- Fonts loaded from Google Fonts — if you'd prefer self-hosting for privacy/perf, download the woff2 files and swap the `<link>` for a local `@font-face` block.
- The coded-aperture SVG in the hero is a small hand-coded binary mask. Replace with an actual MURA pattern if you want.
