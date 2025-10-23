# Next.js Debug Tools

**Live:** https://nextjs-debug-tools.vercel.app  

A tiny, purpose-built Next.js 14 app that demonstrates the **exact surfaces a Vercel Customer Support Engineer** troubleshoots daily:

- App Router (server vs client components)
- **ISR vs Dynamic** rendering
- **Edge API** routes (request/headers inspection)
- **Middleware** auth gate (route protection)
- **Manual revalidation** (`revalidatePath`)

Built by **Santiago Aguilar** — Technical Support Engineer (Linux • Web • Cloud • Dev Support Track)

---

## Why this exists (for interviewers)

This repo shows I can:
- Reproduce issues quickly across **routing, caching, headers, and auth**.
- Explain **rendering modes** (ISR vs dynamic) and **Edge runtimes** clearly.
- Turn findings into **repeatable fixes** and **docs**.

---

## Features (try these routes)

- `/headers` — Inspects **server-observed request headers** via an **Edge API** (`/api/echo`).
- `/dynamic` — **No-store** rendering; timestamp updates on every request.
- `/revalidated` — **ISR** page with a button that triggers `POST /api/revalidate` → `revalidatePath("/revalidated")`.
- `/api/echo?msg=hello` — Echo endpoint (Edge runtime) that returns your headers and a message.
- `/admin` — Protected by **middleware**: returns **401** unless `?token=letmein`.

---

## How it works (short architecture)

- **App Router**: Pages live in `app/*`. `layout.tsx` sets base HTML + metadata.  
- **ISR vs Dynamic**: Pages export either `export const revalidate = <seconds>` (ISR) or `export const dynamic = "force-dynamic"` (no cache).  
- **Edge API**: `app/api/echo/route.ts` runs at the Edge and enumerates request headers.  
- **Middleware**: `middleware.ts` guards `/admin/*` and returns JSON 401 without a token.  
- **Manual revalidation**: `app/api/revalidate/route.ts` calls `revalidatePath` to refresh ISR content on demand.

---

## Run locally

```bash
# recommended: Node 20.x (repo is pinned)
npm i
npm run dev
# open http://localhost:3000
````

## Deploy on Vercel

1. Import the GitHub repo in Vercel (Next.js preset → defaults).
2. In Project Settings → **Node.js Version**: **20.x**.
3. Deploy and verify the routes above.

> Full Vercel settings + troubleshooting: see [`/docs/vercel-project-settings.md`](./docs/vercel-project-settings.md)

---

## Troubleshooting playbook (quick)

* **Stale page**: it’s ISR. Click the button on `/revalidated` or lower `revalidate`.
* **Headers missing**: ensure you’re hitting the **Edge** endpoint `/api/echo`.
* **401 on /admin**: append `?token=letmein`.
* **Odd local vs cloud behavior**: verify **Node 20.x** locally and in Vercel.

---

## Tech stack

* Next.js 14 (App Router, Edge, ISR)
* React 18
* TypeScript
* Vercel (deployment)

---

## How I’d explain this in an interview (script)

* “`/dynamic` vs `/revalidated` shows **rendering modes**: one is **no-store** (fresh per request), the other is **ISR** (cached for N seconds or until manual revalidation).”
* “`/api/echo` is an **Edge function** that logs **request headers**, which is how I debug caching/CDN issues and auth cookies.”
* “`middleware.ts` enforces a simple policy on `/admin/*` to demonstrate **route protection** and **path matchers**.”
* “`/api/revalidate` triggers `revalidatePath` → this is how we fix stale content without redeploys.”

---

## License

MIT © 2025 Santiago Aguilar
