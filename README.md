# Property Search (React)

A small property-search web app built with **Vite + React**. It loads property data from a local JSON file, lets users search with multiple criteria, view full property details (gallery + tabs), and manage **Favourites** with persistence using **localStorage**.

## Live Demo

- https://rushan-harusha.github.io/property-search-react/

---

## Features

### Search

- Filter by:
  - Property type
  - Min/Max price
  - Min bedrooms
  - Location text (e.g., postcode/area)
- Results are shown as clickable cards

### Property Details

- Route: `#/property/:id`
- Image gallery:
  - Main photo + thumbnails
  - “View all photos” modal/lightbox
- Tabs:
  - Description
  - Floor plan image
  - Google Maps embed (iframe)

### Favourites

- Add favourites by:
  - Heart button on property cards (♡ / ♥)
  - Drag & drop property cards into the favourites sidebar
- Remove favourites by:
  - ✕ button inside the favourites sidebar
  - Drag a favourite into the “Drop here to remove” zone
- Clear all favourites button
- Favourites persist via `localStorage` (duplicate prevention included)

### Responsive UI

- Layout adapts for smaller screens using CSS grid/media queries.

### Security

- Safe rendering: descriptions are split into paragraphs (no `dangerouslySetInnerHTML`)
- Content Security Policy (CSP) is added via `<meta http-equiv="Content-Security-Policy" ...>`

---

## Tech Stack

- React + Vite
- React Router (HashRouter for GitHub Pages)
- react-tabs
- Vitest + Testing Library (unit tests)

---

## Getting Started

### 1) Install

```bash
npm install
```

### 2) Run locally (dev)

```bash
npm run dev
```

### 3) Build

```bash
npm run build
```

### 4) Run tests

```bash
npm run test
```

---

## Available Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview the build locally
- `npm run test` — run unit tests (Vitest)
- `npm run deploy` — deploy to GitHub Pages (gh-pages)

---

## Deployment (GitHub Pages)

This project is deployed to GitHub Pages using a build + deploy workflow.

### Important settings

1. **Vite base path** should match the repo name:

`vite.config.js`

```js
export default defineConfig({
  base: "/property-search-react/",
  plugins: [react()],
});
```

2. **Use HashRouter** so refresh and direct links work on GitHub Pages:

`App.jsx`

```jsx
<HashRouter>
  <Routes>
    <Route path="/" element={<SearchPage />} />
    <Route path="/property/:id" element={<PropertyPage />} />
  </Routes>
</HashRouter>
```

### Deploy commands

```bash
npm run build
npm run deploy
```

If the site looks unchanged after deploy, do a hard refresh:

- Windows: `Ctrl + Shift + R`

---

## Project Structure (high level)

```
src/
  components/
    PropertyCard.jsx
    ImageGallery.jsx
    PropertyTabs.jsx
    FavouritesSidebar.jsx
  context/
    FavouritesContext.jsx
  pages/
    SearchPage.jsx
    PropertyPage.jsx
  utils/
    filterProperties.js
  data/
    properties.json
```

---

## Data & Images

### Data file

- `src/data/properties.json` contains all property records.

### Images

- Property images use paths like `images/prop1pic1small.jpg`
- The app builds correct URLs using:
  - `import.meta.env.BASE_URL` (important for GitHub Pages)
- Make sure your images are in the correct place (commonly `public/images/...`) so they can be served by Vite.

---

## Testing

Unit tests include:

- `filterProperties()` multi-criteria filtering
- favourites store behaviour (add once, remove, clear, localStorage)

Run:

```bash
npm run test
```

---

## Notes

- The console warning about `frame-ancestors` being ignored in a `<meta>` CSP is normal: browsers only enforce `frame-ancestors` when CSP is delivered via HTTP headers, not via meta tags.
- Routing on GitHub Pages works via hash URLs:
  - `.../property-search-react/#/`
  - `.../property-search-react/#/property/prop1`

---

## Author

Rushan Harusha Weerakkody
