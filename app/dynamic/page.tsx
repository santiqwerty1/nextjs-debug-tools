export const dynamic = "force-dynamic"; // no-store

export default function Dynamic() {
  return (
    <main>
      <h2>Dynamic (no-store)</h2>
      <p>Each request renders fresh on the server.</p>
      <p>Server time: {new Date().toISOString()}</p>
    </main>
  );
}
