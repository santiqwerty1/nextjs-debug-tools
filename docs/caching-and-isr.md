# Caching & ISR – How Rendering Behavior Works in This Project

Caching behavior is one of the most common causes of confusion in production systems. This project demonstrates three core approaches to data freshness in Next.js.

---

## ✅ Rendering Modes Overview

| Mode | Config | Behavior | Use Cases |
|------|--------|----------|-----------|
| **Static** | default | Builds once at deploy | Marketing pages |
| **ISR** | `export const revalidate = 60` | Cached + periodically refreshed | Blog, docs |
| **Dynamic** | `export const dynamic = "force-dynamic"` | No cache at all | Auth pages, live dashboards |

---

## ✅ ISR – Incremental Static Regeneration

ISR gives you the performance of static pages with the freshness of dynamic content.

Example from this repo (`/revalidated`):

```ts
export const revalidate = 120;
````

Behavior:

* First request builds and caches HTML
* Cache reused for 120 seconds
* After expiration, the next request regenerates content in the background
* Users always get fast responses

---

## ✅ On-Demand Revalidation

We also demonstrate manual cache invalidation for ISR:

Route: `/api/revalidate`

```ts
revalidatePath("/revalidated");
```

This forces that route to refresh immediately without deploys — useful for CMS or admin dashboards.

---

## ✅ Dynamic Rendering (No Cache)

Page: `/dynamic`

```ts
export const dynamic = "force-dynamic";
```

This guarantees fresh HTML on every request. Use this for sensitive or per-user data.

---

## ✅ Debugging Cache Behavior

Use this 3-step checklist:

1. **Inspect headers**
   Look for:

   * `cache-control`
   * `x-vercel-cache: HIT/MISS/STALE`

2. **Check page config**

   * ISR? (`revalidate`)
   * Dynamic? (`force-dynamic`)
   * Static default?

3. **Trace fetch caching**

   * Use: `fetch(url, { cache: "no-store" })`

---

## ✅ Cache Layers on Vercel

| Layer         | Purpose                         |
| ------------- | ------------------------------- |
| Browser Cache | Can be disabled with `no-store` |
| CDN Cache     | Where ISR lives                 |
| Server Cache  | Might reuse React fetch cache   |
| Client State  | May hold stale UI if not reset  |

---

## ✅ Sample Debug Command

Inspect cache state:

```bash
curl -I https://nextjs-debug-tools.vercel.app/revalidated
```

Output to check:

```
x-vercel-cache: HIT
cache-control: s-maxage=120
```

---

## ✅ When ISR Goes Wrong

| Problem                          | Fix                                    |
| -------------------------------- | -------------------------------------- |
| Page never updates               | lower revalidate time                  |
| Deployment stale but no rebuilds | use `revalidatePath()`                 |
| Wrong user data                  | switch to dynamic mode                 |
| Cache confusing                  | inspect headers & disable local caches |

---

Keep this page as a reference when explaining caching behavior in interviews.
