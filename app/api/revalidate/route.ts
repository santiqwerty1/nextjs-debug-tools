import { revalidatePath } from "next/cache";

export async function POST() {
  revalidatePath("/revalidated");
  return new Response(JSON.stringify({ ok: true, revalidated: "/revalidated" }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}
