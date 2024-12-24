"use client";

import { MDXProvider } from "../hooks/use-mdx";

export default function MDXClientWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return <MDXProvider>{children}</MDXProvider>;
}
