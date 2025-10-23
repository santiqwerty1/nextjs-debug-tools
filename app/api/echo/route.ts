// Edge runtime = fast, globally-distributed, great for header inspection.
export const runtime = "edge";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const msg = url.searchParams.get("msg") ?? "ping";

  // Enumerate headers into a plain object for easy viewing.
  const headers: Record<string, string> = {};
  request.headers.forEach((v, k) => (headers[k] = v));

  // Disable caching to ensure we always see the current request headers.
  return new Response(JSON.stringify({ ok: true, msg, headers }), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
}