import { Metadata } from "next";
import Page from "./page";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Ban Lookup",
	description: "Global Ban lookup for Script Builders."
}

export default function Layout() {
	return (
		<Suspense>
			<Page/>
		</Suspense>
	)
};