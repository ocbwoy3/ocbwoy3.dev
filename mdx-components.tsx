import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		a: ({ href, children }) => (
			<Link
				href={href as string}
				className="text-blue-500 hover:underline"
			>
				{children}
			</Link>
		),
		h1: ({ children }) => (
			<h1 className="text-4xl font-bold mb-4">{children}</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-3xl font-semibold mb-3">{children}</h2>
		),
		p: ({ children }) => <p className="mb-4">{children}</p>,
		ul: ({ children }) => (
			<ul className="list-disc pl-5 mb-4">{children}</ul>
		),
		ol: ({ children }) => (
			<ol className="list-decimal pl-5 mb-4">{children}</ol>
		),
		li: ({ children }) => <li className="mb-1">{children}</li>
	};
}
