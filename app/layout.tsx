import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import { Suspense, useEffect } from "react";
import { PageLoadHandler } from "@/components/site/PageLoadHandler";
import Footer from "@/components/site/Footer";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { Toaster as ToasterToast } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "ocbwoy3.dev",
	description: "The website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen `}>
				<PageLoadHandler/>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<ToasterToast/>
					<ToasterSonner/>
					<main className="flex-grow">
						<Suspense>
							{children}
						</Suspense>
					</main>
					<Footer/>
				</ThemeProvider>
			</body>
		</html>
	);

}
