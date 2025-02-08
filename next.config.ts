import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

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
