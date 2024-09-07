/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "loremflickr.com",
      },
      {
        hostname: "firebasestorage.googleapis.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
}

module.exports = nextConfig
