import { Metadata } from "next";
import Page from "./page";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Replay '24",
	description: "My Apple Music Replay: 2024"
}

export default function Layout() {
	return (
		<Page/>
	)
};