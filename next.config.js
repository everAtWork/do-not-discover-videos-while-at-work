/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		YOUTUBE_API_KEY: "AIzaSyBey0Nvh_5CQAYHJOzI8IAVRU2qEKMBmVY",
		NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY: "pk_live_13A16670EE056BB7",
		MAGIC_SERVER_KEY: "sk_live_0B444828F57C9A93",
		NEXT_PUBLIC_HASURA_ADMIN_SECRET:
			"fQeRi6uwGs4eWrpcJhROwY7ajYePb1GztumUOeXTyQrPgC6bs7kXitPFdkWOGk6X",
		NEXT_PUBLIC_HASURA_ADMIN_URL:
			"https://integral-terrier-43.hasura.app/v1/graphql",
		JWT_SECRET: "knifeofiknifeofiknifeofiknifeofi",
		DEVELOPMENT: true,
	},
	swcMinify: true,
	images: {
		domains: ["images.unsplash.com", "i.ytimg.com"],
	},
};
module.exports = nextConfig;
