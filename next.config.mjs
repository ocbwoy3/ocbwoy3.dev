/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "cdn.ocbwoy3.dev",
            },
            {
                protocol: "https",
                hostname: "cdn.ocbwoy3.dev",
            }
        ],
    },
};

export default nextConfig;
