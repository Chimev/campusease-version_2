/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
      ignoreDuringBuilds: true,
  },
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'res.cloudinary.com', // Cloudinary's hostname
              port: '',
              pathname: '/**', // Allow all paths
          },
      ],
  },
};

export default nextConfig;
