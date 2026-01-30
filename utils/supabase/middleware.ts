import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // 1. Create the initial response
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 2. Initialize the Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. Define your route flags
  const isLandingPage = request.nextUrl.pathname === "/";
  const isLoginPage = request.nextUrl.pathname.startsWith("/login");
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  // 5. Authentication Logic
  
  // PROTECT ROUTES: If no user and trying to access anything that isn't Landing/Login/Auth
  if (!user && !isLandingPage && !isLoginPage && !isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // REDIRECT AUTHENTICATED: If user is logged in, don't let them see the login page
  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    // Assuming your main app is inside the (dashboard) group
    url.pathname = "/"; 
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}