import { execSync } from "child_process";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypePrettyCode from "rehype-pretty-code";
import withMDX from "@next/mdx";
import { readFileSync } from "fs";

const v = JSON.parse(readFileSync("./package.json"));

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		NEXT_VERSION: v.dependencies.next,
		NEXT_PUBLIC_GIT_BRANCH: getGitBranch(),
		NEXT_PUBLIC_GIT_COMMIT_HASH: getGitCommitHash(),
	},
	generateBuildId: async () => {
		return getGitCommitHash();
	},
	async redirects() {
		return [
			{
				source: "/%F0%9F%93%B8/:slug",
				destination: "https://i.darktru.win/:slug",
				permanent: false,
			},
			{
				source: "/docs",
				destination: "/docs/intro",
				permanent: false,
			},
			{
				source: "/appeal",
				destination: "/docs/appeal",
				permanent: false,
			},
			{
				source: "/xrpc/com.atproto.sync.getBlob",
				destination:
					"https://i.darktru.win/xrpc/com.atproto.sync.getBlob",
				permanent: false,
			},
		];
	},
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

function getGitBranch() {
	return execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
}

function getGitCommitHash() {
	return execSync("git rev-parse HEAD").toString().trim();
}

const mdxConfig = withMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeHighlight, rehypePrettyCode],
	},
});

export default mdxConfig(nextConfig);
