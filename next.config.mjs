import { execSync } from 'child_process';



/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		NEXT_PUBLIC_GIT_BRANCH: getGitBranch(),
		NEXT_PUBLIC_GIT_COMMIT_HASH: getGitCommitHash(),
	},
	generateBuildId: async () => {
		return getGitCommitHash();
	},
	transpilePackages: ["bsky-react-post"]
};

function getGitBranch() {
	try {
		const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
		return branch;
	} catch (error) {
		console.error('Failed to get Git branch:', error);
		return 'unknown';
	}
}
  
function getGitCommitHash() {
	try {
		const commitHash = execSync('git rev-parse HEAD').toString().trim();
		return commitHash;
	} catch (error) {
		console.error('Failed to get Git commit hash:', error);
		return 'unknown';
	}
}
  