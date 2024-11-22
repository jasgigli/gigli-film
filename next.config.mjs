import withPWA from "next-pwa";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
  images: {
    domains: ["gigli-film.vercel.app"],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(withPWA(nextConfig));
