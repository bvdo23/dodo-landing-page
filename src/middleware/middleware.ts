import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "vi"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match all pathnames except for
  // - api routes
  // - static files
  // - _next paths
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
