import { BMFView } from "@/components/pages/bmf";
import { Title } from "@/components/site/SiteNameHeader";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { toast } from "sonner";
import { Suspense } from "react";
import { PostSkeleton } from "bsky-react-post";
import { BlueskyPost } from "@/components/pages/BlueskyPost";

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
			<Title/>
			<div className="w-full grid place-items-center">
				<div className="pt-16 text-center max-sm max-w-96">
					<div className="font-extrabold text-xl">
						{"It's OCbwoy3"}
					</div>
					<div className="text-muted-foreground/50">
						{"look around :3"}
					</div>
				</div>
				<div className="h-2"/>
				<BMFView/>
				<div className="w-96 text-left text-muted-foreground/50 text-xs">
					{"What is BMF? "}<strong>{"Be My Friend"}</strong>
					{" - Basically, people posting a TikTok slideshow containing things they like, what they are, their hobbies, etc. to find "}
					<Link href="https://fluentslang.com/what-does-moots-mean-in-slang/" className="underline decoration-dotted">moots</Link>.
				</div>
				<div className="pt-16 text-center max-sm max-w-96">
					<div className="font-extrabold text-xl">
						{"Who?"}
					</div>
					<div className="text-muted-foreground/50 text-sm">
						<Suspense fallback="idk">
							{Math.floor(new Date(Date.now() - new Date(2009, 6, 16).getTime()).getFullYear()-1970)}
						</Suspense>
						{" btw, and insert text here"}
					</div>
				</div>
			</div>
		</>
	);
}

