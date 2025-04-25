import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Proteger todas las rutas excepto las que definamos acá
const isPublicRoute = createRouteMatcher(["/login(.*)", "/sign-up(.*)", "/"]);

export default clerkMiddleware(
  async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  },
  // { debug: process.env.NODE_ENV === "production" ? false : true }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
