import { execSync } from "child_process";
import v from "./package.json" assert { type: "json" };
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypePrettyCode from "rehype-pretty-code";
import withMDX from "@next/mdx";

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
	experimental: {
		// mdxRs: true,
		turbo: true
	},
	// transpilePackages: ["bsky-react-post"],
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	// Configure MDX to use remark-gfm
	webpack: (config, { isServer }) => {
		config.module.rules.push({
			test: /\.mdx?$/,
			use: [
				{
					loader: "@mdx-js/loader",
					options: {
						remarkPlugins: [remarkGfm],
						rehypePlugins: [rehypeHighlight, rehypePrettyCode],
					},
				},
			],
		});

		return config;
	},
	async redirects() {
		return [
			{
				source: '/discord',
				destination: 'https://discord.gg/Nvpzc3dDSz',
				permanent: false
			},
			{
				source: '/appeal',
				destination: 'https://docs.ocbwoy3.dev/docs/112/appeal',
				permanent: false
			},
			
			{
				source: '/bsky',
				destination: 'https://bsky.app/profile/did:plc:s7cesz7cr6ybltaryy4meb6y',
				permanent: false
			},
			{
				source: '/darktru',
				destination: 'https://darktru.win',
				permanent: false
			}
			
		]
	}
};

function getGitBranch() {
	try {
		const branch = execSync("git rev-parse --abbrev-ref HEAD")
			.toString()
			.trim();
		return branch;
	} catch (error) {
		console.error("Failed to get Git branch:", error);
		return "unknown";
	}
}

function getGitCommitHash() {
	try {
		const commitHash = execSync("git rev-parse HEAD").toString().trim();
		return commitHash;
	} catch (error) {
		console.error("Failed to get Git commit hash:", error);
		return "unknown";
	}
}

const mdxConfig = withMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [['remark-gfm']],
	},
});

export default mdxConfig(nextConfig);
