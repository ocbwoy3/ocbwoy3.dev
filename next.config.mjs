import { execSync } from "child_process";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import v from "./package.json" assert { type: "json" };

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
		mdxRs: {
			mdxType: "gfm",
		},
	},
	// transpilePackages: ["bsky-react-post"],
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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

const withMDX = createMDX({
	options: {
		remarkPlugins: [["remark-gfm", { singleTilde: false }]],
		rehypePlugins: [],
	},
	siteURL: "http://ocbwoy3.dev",
});

export default withMDX(nextConfig);
