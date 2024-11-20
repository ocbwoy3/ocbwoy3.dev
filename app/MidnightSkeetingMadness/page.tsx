import { BMFView } from "@/components/pages/bmf";
import { Title } from "@/components/site/SiteNameHeader";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Welcome to ocbwoy3.dev",
	description: "OCbwoy3 is a gay furry, alright? He plays Roblox aswell.",
};

/*
<div className="w-full flex justify-center items-center px-4 py-8">
	<Suspense fallback={<PostSkeleton/>}>
		<BlueskyPost did="did:plc:s7cesz7cr6ybltaryy4meb6y" id="3laxy3upo7c25"/>
	</Suspense>
</div>
*/ 

export default function Page() {
	return (
		<>
			<div className="h-8"/>
			<div className="font-bold text-center">
				<span className="text-3xl">{"MIDNIGHT SKEETING MADNESS"}</span><br/>
				<span>{"The one and only experience by OCbwoy3"}</span>
				<br/>
				<br/>
				<br/>
				<br/>
				<span className="text-muted">{"also visit darktru.win! :3"}</span>
			</div>
		</>
	);
}

