import { Metadata } from "next";
import Page from "./page";

export const metadata: Metadata = {
	title: "Hall of Shame",
	description: "A list of users who have been banned using 112.",
};

export default function Layout() {
	return (
		<Page/>
	)
};