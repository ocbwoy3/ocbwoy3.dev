import { Metadata } from "next";
import Page from "./page";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "RemUI",
	description: "Secret :3"
}

export default function Layout() {
	return (
		<Page/>
	)
};