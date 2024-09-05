import type { Metadata } from "next";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next"

import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
	title: "ocbwoy3.dev",
	description: "OCbwoy3, but it's the website.",
};

import { Inter } from 'next/font/google'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
})

import { VercelToolbar } from '@vercel/toolbar/next';
import { Suspense } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				<Toaster />
				<SpeedInsights/>
				<Suspense>
					<div className="absolute bottom-[10px] left-[10px] text-xs text-muted-foreground z-[9999]">
						© OCbwoy3 2024-present &mdash; <a href="https://github.com/ocbwoy3/ocbwoy3.dev/" className="text-blue-500 underline pointer-events-auto z-501">Source</a><br/>
						APIs for Karma, Nova and the Goober Project are provided by third parties.
						{/* &mdash; <a href="/legal" className="text-blue-500 underline pointer-events-auto z-501">Terms</a> */}
					</div>
				</Suspense>
				{/* <Suspense>
					<VercelToolbar/>
				</Suspense> */}
			</body>
		</html>
	);
}
