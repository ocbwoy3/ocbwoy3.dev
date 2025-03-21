import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PageLoadHandler } from "@/components/site/PageLoadHandler";
import Footer from "@/components/site/Footer";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { Toaster as ToasterToast } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import Link from "next/link";

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
const monaspaceNeon = localFont({
	src: "./fonts/MonaspaceNeon-Regular.woff",
	variable: "--font-monaspace-neon",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: {
		default: "Page",
		template: "%s - OCbwoy3"
	},
	description: "The website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen max-h-screen`}>
				<PageLoadHandler/>
				<ThemeProvider attribute="class" enableSystem>
					<ToasterToast/>
					<ToasterSonner/>
					<main className="flex-grow">
						<Link href="/explore">
							<button className="fixed top-2 right-2 bg-mantle stroke stroke-2 stroke-crust hover:stroke-blue rounded-full text-blue text-center justify-center w-16 h-16 z-[999]">
								<span className="w-full justify-center text-2xl">m</span>
							</button>
						</Link>
						{children}
					</main>
					<Footer/>
				</ThemeProvider>
			</body>
		</html>
	);

}
