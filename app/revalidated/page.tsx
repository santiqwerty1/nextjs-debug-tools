export const revalidate = 120;

export default function Revalidated() {
  return (
    <main>
      <h2>ISR + Manual Revalidation</h2>
      <p>Last render: {new Date().toISOString()}</p>
      <form action="/api/revalidate" method="post" style={{marginTop:12}}>
        <button type="submit">Revalidate this path</button>
      </form>
    </main>
  );
}
