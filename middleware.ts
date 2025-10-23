import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple guard for /admin/* routes using a URL token.
// Interview: Middleware runs BEFORE a request hits a route — ideal for lightweight policy checks.
export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith("/admin")) {
    // Trivial demo-auth: require ?token=letmein
    const token = url.searchParams.get("token");
    if (token !== "letmein") {
      // Return JSON 401 (instead of redirect) to make behavior obvious in the demo
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  return NextResponse.next();
}

// Limit middleware to /admin/* paths to avoid intercepting the entire app.
export const config = { matcher: ["/admin/:path*"] };
