import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getUserRole } from "../get-user-role";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const url = request.nextUrl.clone();
  const path = url.pathname;

  if (
    (path.startsWith("/admin") ||
      path.startsWith("/business") ||
      path.startsWith("/normal/self-pick-up") ||
      path.startsWith("/normal/profile")) &&
    !user
  ) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  const role = await getUserRole();

  if (role === "business" && (path === "/" || path === "")) {
    url.pathname = "/business/dashboard";
    return NextResponse.redirect(url);
  }

  if (path.startsWith("/admin") && role !== "admin") {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  if (path.startsWith("/business") && role !== "business") {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  if (path.startsWith("/normal") && role !== "normal") {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
