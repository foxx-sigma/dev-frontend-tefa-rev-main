// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly tell TurboPack the project root directory.
  // This avoids the warning caused by multiple package-lock.json files.
  turbopack: {
    // __dirname resolves to this file's directory (the project root)
    root: __dirname,
  },
};

module.exports = nextConfig;
