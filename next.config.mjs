// Static export so it deploys to GitHub Pages / Vercel / any static host.
// For a GitHub Pages project site set NEXT_PUBLIC_BASE_PATH=/<repo-name> at build time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
export default {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};
