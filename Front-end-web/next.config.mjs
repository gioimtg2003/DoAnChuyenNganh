/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/DoAnChuyenNganh',
    output: "export",
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "do-an-chuyen-nganh.s3.ap-southeast-1.amazonaws.com",
                port: "",
                pathname: "/**",
            },
        ],
        unoptimized: true

    },
};

export default nextConfig;
