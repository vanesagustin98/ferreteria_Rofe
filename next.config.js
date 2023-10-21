/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    DB_URI: "mongodb://localhost:27017/next13-auth",
    NEXTAUTH_SECRET: "Hola",
    GOOGLE_CLIENT_ID:
      "1094594183502-1a7f497ufqlu9mf65ionsjqu43tmeonf.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
  },

images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
