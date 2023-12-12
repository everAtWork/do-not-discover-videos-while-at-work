/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		YOUTUBE_API_KEY: "AIzaSyBey0Nvh_5CQAYHJOzI8IAVRU2qEKMBmVY",
	},
	swcMinify: true,
	images: {
		domains: ["images.unsplash.com", "i.ytimg.com"],
	},
};
module.exports = nextConfig;
