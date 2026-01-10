import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// middleware.ts
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const userRoles = (token?.role as string[]) || [];
  const isAdmin = userRoles.includes("admin");

  // 1️⃣ BLOCK AUTHENTICATED USERS FROM ANY SIGN-IN PAGE
  const isLoginPage = pathname === "/auth/login" || pathname === "/sign-in";
  
  if (isLoginPage && token) {
    // If logged in, redirect away from sign-in pages immediately
    return NextResponse.redirect(new URL(isAdmin ? "/admin/dashboard" : "/", req.url));
  }

  // 2. Protect Admin Routes
  if (pathname.startsWith("/admin")) {
    if (!token || !isAdmin) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // 3. Protect User Routes from Admins
  const userOnlyPaths = ["/profile", "/add-listing", "/category"];
  const isUserOnlyPath = userOnlyPaths.some(path => pathname.startsWith(path));

  if (isUserOnlyPath && isAdmin) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}


export const config = {
  // Use the matcher to apply middleware only to relevant paths
  matcher: [
    "/admin/:path*", 
    "/auth/login",
    "/profile/:path*",
    "/add-listing",
    "/category/:path*" ,
     "/sign-in", 
      "/", 
  ],
};
