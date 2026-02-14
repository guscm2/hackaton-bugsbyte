import type { NextConfig } from "next";

const nextConfig: NextConfig = 
{
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // This uses a 308 status code for SEO
      },
    ]
  },
  
  experimental:
  {
    serverActions: 
    {
      bodySizeLimit: "10mb",
    }
  },  
};

export default nextConfig;
