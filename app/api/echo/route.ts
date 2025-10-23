export const runtime = "edge";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const msg = url.searchParams.get("msg") ?? "ping";
  const headers: Record<string, string> = {};
  request.headers.forEach((v, k) => (headers[k] = v));
  return new Response(JSON.stringify({ ok: true, msg, headers }), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
}
