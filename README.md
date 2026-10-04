# MAROC — The Digital Kingdom

Multilingual national knowledge platform about the Kingdom of Morocco: history,
monarchy, institutions, law, religion, Amazigh heritage, culture, cuisine,
cities, regions, UNESCO heritage, symbols, events, an interactive map, live
weather, a search engine and a grounded AI assistant — with a full CMS admin.

Content is available in five locales, including RTL support for Arabic and
Tachelhit (Tifinagh script):

| Code | Language        | Script   | Direction |
| ---- | --------------- | -------- | --------- |
| `ar` | العربية          | Arabic   | RTL       |
| `tz` | ⵜⴰⵎⴰⵣⵉⵖⵜ         | Tifinagh | RTL       |
| `fr` | Français        | Latin    | LTR       |
| `en` | English         | Latin    | LTR       |
| `es` | Español         | Latin    | LTR       |

## Tech stack

- **Next.js 15** (App Router, RSC, static generation) + **React 19**
- **TypeScript** end-to-end
- **Tailwind CSS v4** with a Moroccan-inspired design system
- **Prisma 6** — SQLite for zero-setup local dev, PostgreSQL for production
- **next-themes** (dark/light), **Leaflet** (map), **Recharts** (analytics),
  **Fuse.js** (search), **Framer Motion** (motion)
- **jose** + **bcryptjs** for cookie-based admin sessions
- **Zod** for validation

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Create the database and seed it (SQLite, zero setup)
npm run db:setup:sqlite

# 4. Run the dev server
npm run dev
```

Open <http://localhost:3000>. The middleware detects your preferred locale and
redirects accordingly (`/en`, `/fr`, `/ar`, …).

The admin panel is at `/admin/login`. Default seeded credentials (override them
with `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`, and change them after first
login):

- **Email:** `admin@maroc.ma`
- **Password:** `change-me-now`

## Scripts

| Script                    | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `npm run dev`             | Start the development server                        |
| `npm run build`           | Production build                                    |
| `npm run start`           | Serve the production build                          |
| `npm run lint`            | ESLint                                              |
| `npm run typecheck`       | `tsc --noEmit`                                      |
| `npm run format`          | Prettier (Tailwind plugin)                          |
| `npm run db:setup:sqlite` | Create SQLite DB + seed (first-time setup)          |
| `npm run db:push:sqlite`  | Apply schema changes to SQLite                      |
| `npm run db:seed`         | Seed the database                                   |
| `npm run db:studio:sqlite`| Open Prisma Studio for SQLite                       |
| `npm run db:push`         | Apply the PostgreSQL schema (`schema.prisma`)       |

## Project structure

```
prisma/
  schema.prisma            # PostgreSQL schema (production)
  schema.sqlite.prisma     # SQLite schema (local dev)
  seed.ts                  # Database seed (admin user, sources, sample content)
src/
  app/
    [locale]/              # Localized public site (all content sections)
    admin/                 # CMS (articles, translations, users, sources, audit, analytics)
    api/                   # auth, search, weather, ai route handlers
    middleware.ts          # Locale detection & redirection
  components/              # layout, sections, content, admin, map, weather, ui
  data/                    # Typed knowledge base (history, cities, recipes, …)
  i18n/                    # Locale config + dictionaries (ar/tz/fr/en/es)
  lib/                     # auth, prisma, search, ai, navigation, utils, actions
  types/                   # Shared TypeScript types
```

## Internationalization

- Locales are defined in `src/i18n/config.ts`; dictionaries live in
  `src/i18n/dictionaries/`. All five dictionaries share an identical key shape.
- `src/middleware.ts` detects the locale from the `NEXT_LOCALE` cookie or the
  `Accept-Language` header and redirects to the localized path.
- RTL locales (`ar`, `tz`) get `dir="rtl"` and locale-specific font stacks.
- Page metadata is generated per-locale from the dictionaries, so `<title>` and
  meta descriptions are translated for every language.

## Content model

Every verifiable entity traces back to a registered **source** (URL, title,
reliability). The seed registers official sources, and the admin panel manages
articles, translations (with review workflow), users and roles, plus an audit
log. The AI assistant answers only from the platform's knowledge base and cites
its sources.

## Notes

- Educational and informational only. For legally binding information, consult
  the official publications cited in each article.
- Weather uses Open-Meteo and the map uses OpenStreetMap tiles — no API keys
  required. Optional keys (`WEATHER_API_KEY`, `MAP_STYLE_URL`, `AI_API_KEY`) are
  documented in `.env.example`.
