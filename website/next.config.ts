import type { NextConfig } from 'next';
const nextConfig: NextConfig = { output: 'export', trailingSlash: true, assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '' };
export default nextConfig;
