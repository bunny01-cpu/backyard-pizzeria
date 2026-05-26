/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceSwcTransforms: false,
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
    },
};

module.exports = nextConfig;
