/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
};

module.exports = withPlugins([withBundleAnalyzer], nextConfig);
