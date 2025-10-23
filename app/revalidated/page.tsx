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

//Purpose: ISR page with revalidate = 120, plus a form that triggers manual revalidation through POST /api/revalidate. 

// Interview points: difference between ISR vs no-store, how revalidatePath refreshes cached content without rebuilds, and how to choose appropriate revalidation intervals.