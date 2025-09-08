// middleware.ts
import { createRouteMatcher } from "@clerk/nextjs/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  const { userId } = await auth();

  if (!userId) {
    return Response.redirect("https://cdt-platform.vercel.app/sign-in");
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};



