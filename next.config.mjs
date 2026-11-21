/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static export. The postbuild script creates sitemap.xml from the exported HTML files.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
