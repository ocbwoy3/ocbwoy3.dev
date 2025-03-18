import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Codeblock } from "./components/docs/Code";
import { BundledLanguage } from "shiki";
import React from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		a: ({ href, children }) => (
			<Link
				href={href as string}
				className="text-blue decoration-blue underline"
			>
				{children}
			</Link>
		),
		h1: ({ children }) => (
			<h1 className="text-4xl font-bold mb-4 pt-8 pb-4">{children}</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-3xl font-semibold mb-3 pt-8 pb-4">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-2xl font-semibold mb-3 pt-8 pb-4">
				{children}
			</h3>
		),
		p: ({ children }) => <p className="mb-4">{children}</p>,
		blockquote: ({ children, ...props }) => <div className="text-red pl-8 pr-8">{children}</div>,
		code: ({ children, className }) => {
			if (className?.includes("hljs")) {
				const lang = (className || "language-luau")!
					.match(/language\-(.+)\s?/)![1]
					.replace(/mdx\-/, "");
				return (
					<Codeblock
						code={`${children}`}
						lang={lang as BundledLanguage}
					/>
				);
			}
			return (
				<span className="font-mono bg-mantle p-1 rounded-sm">
					<span>{children}</span>
				</span>
			);
		},
	};
}
