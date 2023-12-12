/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		YOUTUBE_API_KEY: "AIzaSyBey0Nvh_5CQAYHJOzI8IAVRU2qEKMBmVY",
		NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY: "pk_live_0D79692F95C4C48C",
	},
	swcMinify: true,
	images: {
		domains: ["images.unsplash.com", "i.ytimg.com"],
	},
};
module.exports = nextConfig;
