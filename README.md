# Aurevia - GitHub Pages Deployment

This is a static multi-page website prepared for GitHub Pages hosting from a repository subpath.

## Project Structure

- `index.html` - Home page
- `pages/` - Secondary pages (`about_us.html`, `collections.html`, `contact.html`, `corporate.html`, `policies.html`)
- `components/` - Shared HTML partials (`navbar.html`, `footer.html`)
- `styles/` - Page and shared stylesheets
- `scripts/main.js` - Shared component loader + runtime path normalization
- `assets/` - Images, icons, and favicon files

## Why This Works on GitHub Pages

GitHub Pages serves project sites under:

`https://<username>.github.io/<repository>/`

To avoid broken links under this subpath:

- No local root-absolute links are used (no `href="/..."` or `src="/..."` for local files)
- Shared component links/images are rewritten in `scripts/main.js` using `data-site-href` and `data-site-src`
- Manifest icon paths are relative in `assets/favicon/site.webmanifest`

## Publish Steps (Project Site)

1. Push this folder to a GitHub repository.
2. Open repository **Settings** -> **Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main** (or your default branch)
   - Folder: **/(root)**
4. Save and wait for deployment.
5. Open the generated Pages URL.

## Notes

- `index.html` is the site entrypoint.
- Secondary pages are in `pages/` and are linked through shared components.
- `policies.html` now uses the same shared navbar/footer system as the rest of the site.
