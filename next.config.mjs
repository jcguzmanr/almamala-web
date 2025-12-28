/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Forzar recarga de CSS en desarrollo
  webpack: (config, { dev }) => {
    if (dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
      };
    }
    return config;
  },
};

export default nextConfig;

