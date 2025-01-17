/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: false, // URL末尾のスラッシュ
    // output: "export",
    images: {
        remotePatterns: [
            // {
            //     hostname: 'placehold.jp',
            // },
            { hostname: 'jmqcdhlciyzcedgedfhi.supabase.co' },
        ],
        unoptimized: true, // 画像の最適化 trueが無効
    },
};

export default nextConfig;
