import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { toast } from "sonner";

export const metadata: Metadata = {
	title: "Home",
	description: "Welcome to ocbwoy3.dev!"
}

export default function Page() {
	return (
		<>
			<Link href="/error" className="text-blue-500 hover:underline">
				Test Error Page
			</Link>
		</>
	);
}

