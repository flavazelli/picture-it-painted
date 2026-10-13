# Picture It Painted

A responsive lead generation website for Picture It Painted, built with React, TypeScript and Vite. It uses the business's existing logo and portfolio photos, highlights its listed services and Pointe-Claire location, and provides an estimate inquiry that opens an email draft.

## Requirements

Node.js 20+ and npm.

## Local development

```bash
npm install
npm run dev
```

## Build and preview

```bash
npm run build
npm run preview
```

GitHub Pages deployment is configured in `.github/workflows/static.yml`.

## Updating content

- `src/App.tsx` contains the service list, portfolio captions, business contact details, and page content.
- `src/assets/images/` contains the locally stored project photos sourced from the current Picture It Painted site.
- `public/images/picture-it-painted-logo.png` is the existing business logo.
- `src/styles/global.css` defines the Syne and Inter fonts and shared colors; `src/styles/site.css` contains page and responsive styles.

The estimate form currently prepares a message addressed to `pictureitpainted@gmail.com`. A branded address such as `info@pictureitpainted.com` can replace it once that mailbox is set up. The current form uses the visitor's email application; a production website can connect it to a form service or business inbox.
