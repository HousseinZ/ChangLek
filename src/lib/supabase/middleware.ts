import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const SELECTED_PROFILE_COOKIE = "selected_profile_id";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

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
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: refreshing the session must happen here, between createServerClient
  // and any code that uses request/response. DO NOT add code between.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Routes that don't require auth (login/signup pages).
  const isPublicAuthRoute =
    path.startsWith("/login") ||
    path.startsWith("/signup") ||
    path.startsWith("/auth"); // OAuth callback, etc.

  // Routes that need auth but NOT a selected profile (the picker itself).
  const isProfilePickerRoute = path.startsWith("/select-profile");

  // 1. Not logged in → bounce to /login (unless already on a public auth route).
  if (!user && !isPublicAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 2. Logged in but on /login or /signup → bounce to /select-profile.
  if (user && isPublicAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/select-profile";
    return NextResponse.redirect(url);
  }

  // 3. Logged in but no profile selected → bounce to /select-profile
  //    (skip if already there).
  if (user && !isProfilePickerRoute) {
    const profileCookie = request.cookies.get(SELECTED_PROFILE_COOKIE)?.value;
    if (!profileCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/select-profile";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
