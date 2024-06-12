/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    },
    images: {
        domains:['image.cnbcfm.com','a57.foxnews.com','cdn.vox-cdn.com','cdn.cnn.com','lh3.googleusercontent.com'],
    }
};

export default nextConfig;
