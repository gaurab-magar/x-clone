/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL
    },
    images: {
        domains:['image.cnbcfm.com','a57.foxnews.com','cdn.vox-cdn.com','cdn.cnn.com'],
    }
};

export default nextConfig;
