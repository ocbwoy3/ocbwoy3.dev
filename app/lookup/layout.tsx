import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Global Ban Lookup",
	description: "THE TOOL to assist you wih global ban lookups.",
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
    return children
}