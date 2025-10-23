// Revalidate every 60s (ISR). This demonstrates static generation with periodic refresh.
// Interview talking point: This value controls cache lifetime for this page.
export const revalidate = 60;

export default function Home() {
  // NOTE: This timestamp is generated at build/render time.
  // On ISR pages, it updates after the cache window or a manual revalidate.
  const now = new Date().toISOString();

  return (
    <main>
      <h1>Next.js Debug Tools</h1>
      <p>
        Mini toolkit for common Support Engineer surfaces: headers, dynamic vs ISR, edge API,
        middleware, and manual revalidation.
      </p>
      <ul>
        {/* Link to each demo route — see README for behavior explanations */}
        <li><a href="/headers">Headers inspector</a></li>
        <li><a href="/dynamic">Dynamic (no-store) page</a></li>
        <li><a href="/revalidated">ISR + manual revalidate demo</a></li>
        <li><a href="/api/echo?msg=hello">API: /api/echo (Edge)</a></li>
        <li><a href="/admin?token=letmein">/admin (protected by middleware)</a></li>
      </ul>

      {/* “Build time” vs “request time” discussion point in interviews */}
      <p style={{ opacity: 0.7 }}>Build time (ISR every 60s): {now}</p>
    </main>
  );
}
