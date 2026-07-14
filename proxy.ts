import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ADMIN_ROUTES = [
  "/admin/login",
  // TEMP: dev-only registration page so you can create the first user(s)
  // while the DB is empty. Remove this route (and app/admin/register)
  // once you have real accounts / an invite flow.
  "/admin/register",
];

export function proxy(
  request: NextRequest
) {
  const { pathname } = request.nextUrl;
  if (
    !pathname.startsWith("/admin")
  ) {
    return NextResponse.next();
  }

  if (
    PUBLIC_ADMIN_ROUTES.includes(
      pathname
    )
  ) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get("accessToken")
      ?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL(
        "/admin/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};