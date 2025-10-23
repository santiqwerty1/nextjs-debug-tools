// Force dynamic rendering — no cache. Every request re-renders on the server.
// Interview: Use this when data must be fresh or sensitive per request.
export const dynamic = "force-dynamic";

export default function Dynamic() {
  return (
    <main>
      <h2>Dynamic (no-store)</h2>
      <p>Each request renders fresh on the server.</p>
      <p>Server time: {new Date().toISOString()}</p>
    </main>
  );
}