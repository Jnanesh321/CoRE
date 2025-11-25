# CoRE - Club of Robotics & Electronics | VCET Puttur

Modern, lightweight React website for CoRE - VCET Puttur's premier technical club. Built with Vite for optimal performance and minimal server memory usage.

## 🎯 Key Features

- ⚡ **Lightning Fast** - Vite-powered development and optimized production builds
- 📱 **Fully Responsive** - Mobile-first design with dark mode support
- ♿ **Accessible** - WCAG compliant with keyboard navigation and screen reader support
- 🔍 **SEO Optimized** - Dynamic meta tags, structured data, and Open Graph tags
- 🎨 **Sceptix-Inspired Design** - Professional animations and letter-spaced typography
- 🛡️ **Error Handling** - Error boundaries and 404 pages
- ✅ **Form Validation** - Real-time validation with loading states
- 🔎 **Search & Filter** - Lightweight search for projects with status filters
- 📧 **Newsletter** - Email subscription with validation
- 💾 **Low Memory** - Optimized for minimal server resource usage (<50MB RAM)

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ErrorBoundary.jsx
│   ├── SEO.jsx
│   ├── Icon.jsx
│   ├── Newsletter.jsx
│   ├── Header.jsx
│   └── Footer.jsx
├── pages/            # Route pages
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Activities.jsx
│   ├── Projects.jsx
│   ├── Events.jsx
│   ├── Team.jsx
│   ├── Join.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
├── data/             # Centralized data
│   └── projectsData.js
├── styles.css        # Global styles with CSS animations
└── main.jsx          # App entry point
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation & Development

```powershell
# Install dependencies
npm install

# Start dev server (usually http://localhost:5173)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

## 🌐 Deployment (Low-Memory Server Optimized)

### Option 1: Static Hosting (Recommended for Low Resources)

**Netlify (Free, Minimal Memory)**
```powershell
# Build the site
npm run build

# Deploy to Netlify (one-time setup)
npx netlify-cli deploy --prod --dir=dist
```

**GitHub Pages (Free)**
```powershell
# Build and deploy
npm run build
npx gh-pages -d dist
```

### Option 2: VPS/Shared Hosting (Minimal Memory)

1. From project root (where `package.json` lives):

```powershell
npm install
npm run dev
```

2. Open the URL printed by Vite (usually `http://localhost:5173`).

## 🗄️ Backend Integration (Supabase + Netlify Functions)

This project now includes a lightweight serverless backend:

| Component | Location | Purpose |
|-----------|----------|---------|
| Application submit function | `netlify/functions/submit-application.js` | Stores application form data in Supabase `applications` table |
| Newsletter subscribe function | `netlify/functions/newsletter-subscribe.js` | Adds subscribers to Supabase `newsletter_subscriptions` table |
| Supabase schema & policies | `SUPABASE_SETUP.md` | SQL to create tables & Row Level Security policies |

### Environment Variables
Create `.env` (local dev) using `.env.example`:
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_BASE_URL=/.netlify/functions
```
Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Netlify site settings before deploying.

### Local Development (frontend + functions)
```powershell
npm install -g netlify-cli
cd netlify/functions
npm install
cd ../../
netlify dev
```
App will be served at `http://localhost:8888` and functions proxied at `/.netlify/functions/*`.

### Application Form
- Frontend: `src/pages/Contact.jsx` now posts JSON to `/.netlify/functions/submit-application`.
- Success response contains `{ success: true, applicationId, timestamp }`.

### Newsletter Subscription
- Frontend: `src/components/Newsletter.jsx` posts to `/.netlify/functions/newsletter-subscribe`.

### Supabase
Run SQL from `SUPABASE_SETUP.md` in Supabase SQL editor to create tables and policies.

### Testing Backend
1. Run `netlify dev`.
2. Submit application at `/contact` → verify row in Supabase `applications`.
3. Subscribe via newsletter → verify row in `newsletter_subscriptions`.
4. Check browser devtools network panel for status codes (200 / 400 / 409 / 500).

### Security
- Row Level Security enabled; anon only allowed INSERT.
- Input validated server-side (email, phone, name length).
- Future admin dashboard can use Supabase Auth for read/update.

### Future Enhancements
- Add SendGrid/Mailgun email notifications (TODO comments in functions).
- Rate limiting via Netlify Edge Functions if needed.
- Admin dashboard (protected route) to review applications.

CI / GitHub Pages

- I added a GitHub Actions workflow `.github/workflows/deploy.yml` that will build the site and publish the `dist` directory to the `gh-pages` branch when you push to `main`. No extra secrets are required — the provided `GITHUB_TOKEN` will be used by the action.

Netlify Forms fallback

- Because this is a single-page React app, Netlify may not detect forms unless a static form exists in the generated HTML. I added a hidden static form to `index.html` so Netlify can discover the `contact` form automatically.

Final notes

- Update any placeholder social URLs in `src/components/Footer.jsx`.
- Do NOT commit real Supabase service keys; only anon public key is needed here.
- Consider rotating the database password periodically; it is NOT stored in this repo.

Branding & Dark Mode

- The project uses CSS variables for colors in `src/styles.css`. The primary accent is `--brand-primary`. To change colors, edit the variables near the top of the file. The CSS also supports a dark theme — users can toggle dark mode via the button in the header. The preference is saved to `localStorage` and respects the system `prefers-color-scheme` by default.
- Fonts: the site loads the `Inter` Google Font in `index.html`. If you have a different font, tell me the Google Font name and I will swap it.

Deployment

- Netlify: connect repo → set build command `npm run build`, publish dir `dist`, add env vars, deploy.
- Vercel: similar (functions would need rewriting to Vercel format if migrated).
- GitHub Pages: static only (backend functions won't run). Use when serverless backend not required.

---
If you need help adding an admin dashboard or email notifications, open an issue.
