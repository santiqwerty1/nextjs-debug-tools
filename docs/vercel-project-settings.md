# Vercel Project Settings — Recommended Defaults

These settings mirror common Support/Success workflows and avoid noisy pitfalls.

## Runtime / Build

- **Framework Preset**: Next.js (auto)
- **Node.js Version**: **20.x** (matches repo `"engines": { "node": "20.x" }`)
- **Install**: `npm install`
- **Build**: `next build`
- **Start**: (Vercel handles)
- **Output**: `.vercel/output` (auto)

> Keep local Node at **20.x** too, so behavior matches Vercel.

## Environment Variables

- None required for this demo.
- Add secrets in **Vercel → Settings → Environment Variables** (never commit `.env`).
- Prefix public values with `NEXT_PUBLIC_...`

## Edge / Node Runtimes

- `app/api/echo/route.ts` uses **Edge** runtime → perfect for header inspection, low latency.
- Other routes use default runtime (Node/Serverless). That mix is intentional for demos.

## Caching & Rendering Cheatsheet

- **ISR**:  
  - In a page: `export const revalidate = 60`  
  - Great for content that can be cached briefly.
- **Dynamic/no-store**:  
  - In a page: `export const dynamic = "force-dynamic"`  
  - Always fresh (bypasses cache).
- **Manual revalidation**:  
  - In an API route: `revalidatePath("/revalidated")`

## Logs & Observability

- Use Vercel **“Functions”** tab to view runtime logs for API routes.
- Add targeted `console.log` during investigation; remove afterward.
- For headers/caching issues, always inspect:
  - `Cache-Control`
  - `Age`
  - `x-vercel-cache` (HIT/MISS/STALE)
  - Cookies / Authorization

## Common Issues & Fixes

- **Stale Content**  
  - Lower `revalidate` or trigger `revalidatePath`.
- **Auth/Cookie not received at Edge**  
  - Confirm the route is **Node** if you need full Node APIs; Edge has limitations.
- **Middleware redirect loops**  
  - Double-check `config.matcher` and token logic.
- **Local vs Cloud mismatch**  
  - Ensure Node **20.x** both locally and in Vercel.

## Security Notes

- Demo token is intentionally trivial: `?token=letmein`  
- In real apps, use signed cookies/headers, CSRF protection, and proper auth.

---
**Checklist before sharing the link**
- [ ] Node **20.x** set in Vercel  
- [ ] Deployed and tested all demo routes  
- [ ] README links: repo + live URL at the top  
- [ ] Remove temporary `console.log`  