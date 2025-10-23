// ISR every 120s; pairs with POST /api/revalidate for manual refresh.
// Interview: Scheduler-like caching; good for content that can be stale briefly.
export const revalidate = 120;

export default function Revalidated() {
  return (
    <main>
      <h2>ISR + Manual Revalidation</h2>
      <p>Last render: {new Date().toISOString()}</p>
      {/* This HTML form calls the API to revalidate this path */}
      <form action="/api/revalidate" method="post" style={{ marginTop: 12 }}>
        <button type="submit">Revalidate this path</button>
      </form>
    </main>
  );
}