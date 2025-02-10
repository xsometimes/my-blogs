import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  // assetPrefix: isProd ? `${process.env.NEXT_PUBLIC_BASE_PATH}/` : '',
  // assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  // exportTrailingSlash: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },

  productionBrowserSourceMaps: false, // Enable source map if needed
  compress: true,

  


  async rewrites() {
    return [
      {
        source: `/api/:path*`,
        destination: 'http://apis.juhe.cn/',
        basePath: undefined, // 如果为 false，则匹配时不会包含 basePath，仅可用于外部重写
        locale: false,
      },
    ];
  },

};

export default nextConfig;
