import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Global Ban Lookup",
	description: "A tool to assist you wih global ban lookups.",
	formatDetection: {
		telephone: false,
		date: false,
		address: false,
		email: false,
		url: false
	}
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
		<Suspense>
			{children}
		</Suspense>
	)
}