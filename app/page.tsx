export const revalidate = 60; // ISR example

export default function Home() {
  const now = new Date().toISOString();
  return (
    <main>
      <h1>Next.js Debug Tools</h1>
      <p>Mini toolkit for common Support Engineer surfaces: headers, dynamic vs ISR, edge API, middleware, and manual revalidation.</p>
      <ul>
        <li><a href="/headers">Headers inspector</a></li>
        <li><a href="/dynamic">Dynamic (no-store) page</a></li>
        <li><a href="/revalidated">ISR + manual revalidate demo</a></li>
        <li><a href="/api/echo?msg=hello">API: /api/echo (Edge)</a></li>
        <li><a href="/admin?token=letmein">/admin (protected by middleware)</a></li>
      </ul>
      <p style={{opacity:0.7}}>Build time (ISR every 60s): {now}</p>
    </main>
  );
}
