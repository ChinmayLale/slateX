import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protect only /workspace and its subpaths
const isProtectedRoute = createRouteMatcher([
  "/documents(.*)", "/documents/(.*)", // protect all routes starting with /workspace
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  } else {
    console.log("user is logged in");
  }
});

export const config = {
  // Match all routes except Next.js internals & static files
  matcher: ["/((?!_next|.*\\..*).*)"],
};
