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
		<body className={inter.className}>
			{children}
			<Toaster />
			<SpeedInsights/>
		</body>
	);
}
