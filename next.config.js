/** @type {import('next').NextConfig} */

const responseHeaders = [
  {
    // Anti Clickjacking response header
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Anti-XSS and Anti-CSRF response header
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Anti-XSS response headers
    key: "Content-Security-Policy",
    value: `default-src 'self'`,
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

module.exports = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/",
        headers: responseHeaders,
      },
      {
        source: "/:path*",
        headers: responseHeaders,
      },
    ];
  },
};
