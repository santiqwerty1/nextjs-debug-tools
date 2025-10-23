import { revalidatePath } from "next/cache";

// Manual revalidation endpoint to refresh the ISR page.
// Interview: This is how we fix stale content without redeploying the app.
export async function POST() {
  revalidatePath("/revalidated");
  return new Response(JSON.stringify({ ok: true, revalidated: "/revalidated" }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}
