# Interview Notes – Next.js Debug Tools (Support Engineer)

These are talking points and explanations I can use during interviews to communicate technical clarity and problem-solving ability.

---

## ✅ High-Level Pitch (short intro)

> This demo project shows my understanding of how modern web apps behave in production.
> It covers the real surfaces support engineers handle daily at Vercel: caching issues, ISR debugging, headers/cookies visibility, middleware routing control, and edge runtimes. Every route solves a specific category of issues I would troubleshoot with a customer.

---

## ✅ Key Concepts to Own

| Topic | 15-second explanation |
|-------|------------------------|
| App Router | Next.js 14 uses the App Router with file-based routing and React Server Components. Pages live in `/app`, and layouts wrap pages persistently. |
| ISR | Incremental Static Regeneration lets you statically pre-render pages and revalidate them per time window or manually. |
| Dynamic vs Static | Dynamic pages (`force-dynamic`) are fresh per request. ISR uses cache + smart regeneration. |
| Edge Runtime | Runs close to the user for low latency. Limited Node APIs; ideal for auth/headers. |
| Middleware | Runs before a request is processed. Great for gating routes or rewriting URLs. |
| RevalidatePath | Refreshes ISR cache manually without redeploying the app. Useful for CMS or dashboards. |

---

## ✅ Routes & Interview Messaging

| Route | Purpose | Interview Notes |
|-------|----------|------------------|
| `/headers` | Observe server-side headers | "Browsers hide some headers; this shows me what Vercel actually sees." |
| `/dynamic` | Disable cache (`force-dynamic`) | "Good for auth, per-user data, or real-time dashboards." |
| `/revalidated` | ISR example | "Shows time-window caching + build-time rendering." |
| `/api/revalidate` | Manual ISR refresh | "Cache invalidation without redeploys." |
| `/api/echo` | Debug Edge API | "I use this to see cookies/headers for debug calls." |
| `/admin` | Middleware protection | "Lightweight auth layer done before the route loads." |

---

## ✅ Common Interview Questions (with answers)

### 1. How do you debug stale data on Vercel?
> I first check whether the route uses static, ISR, or dynamic rendering. Then I inspect response headers for `cache-control` and `x-vercel-cache`. If ISR is enabled, I may trigger `revalidatePath`, lower `revalidate`, or confirm that the fetch isn’t being cached at the client or CDN layer.

### 2. When would you choose dynamic rendering instead of ISR?
> Anytime the data is sensitive or highly personalized. For example, authenticated dashboards, financial data, or requests that depend on cookies or headers.

### 3. What are the tradeoffs of using Edge Functions?
> They’re faster globally and good for security checks, but they can’t use some Node APIs (e.g. fs, crypto modules without web APIs). Great for lightweight logic but not for heavy compute.

### 4. How does `revalidatePath` work?
> It programmatically clears the ISR cache for a specific path. The next request rebuilds fresh HTML, updating the cache automatically.

### 5. How can caching cause bugs in server components?
> If fetch calls aren’t set as `{ cache: "no-store" }` or `revalidate: 0`, the server may reuse cached results unexpectedly.

---

## ✅ Debug Checklist (fast answers)

- Page not updating? → ISR behavior. Call `revalidatePath` or make page dynamic.
- Cookies missing? → You're probably hitting Edge; promote to Node runtime.
- Middleware breaking paths? → Check `config.matcher`.
- Confusing cache state? → Check `x-vercel-cache: HIT/MISS/STALE`.

---

## ✅ Final Closing Sentence (to end interviews strong)

> “I focus on diagnosing request behavior: cache layers, headers, runtime type, and rendering mode. Once I know how the app is behaving, solving the root cause becomes straightforward.”
