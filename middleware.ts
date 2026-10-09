import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClientKey, rateLimit } from "./lib/security";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const result = rateLimit(getClientKey(request));

  if (!result.allowed) {
    return new NextResponse("Too many requests", {
      status: 429,
      headers: { "Retry-After": "60" },
    });
  }

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
