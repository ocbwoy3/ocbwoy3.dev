// app/docs/layout.tsx
import { Metadata } from "next";
import { ReactNode } from "react";
import Head from "next/head";

export const metadata: Metadata = {
	title: "Docs",
	description: "Documentation pages",
};

export default function DocsLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Head>
				<title>Docs</title>
			</Head>
			<div className="docs-layout pl-4 pt-8">
				{children}
			</div>
		</>
	);
}
