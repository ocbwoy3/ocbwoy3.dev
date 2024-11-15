import { execSync } from 'child_process';

const commitHash = execSync('git log --pretty=format:"%h" -n1')
  .toString()
  .trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	generateBuildId: () => {
		return getCommitHash();
	},
	env: {
		COMMIT_HASH: commitHash
	}
};
