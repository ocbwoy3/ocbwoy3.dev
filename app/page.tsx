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
			<Title/>
			<div className="w-full grid place-items-center">
				<div className="pt-16 text-center max-sm max-w-96">
					<div className="font-extrabold text-xl">
						{"Who the FUCK is OCbwoy3?"}
					</div>
					<div className="text-muted-foreground/50 text-sm">
						{"oh yeah, im "}
						<Suspense fallback="??">
							{Math.floor(new Date(Date.now() - new Date(2009, 6, 16).getTime()).getFullYear()-1970)}
						</Suspense>
						{" btw, and i play roblox too, i'm also a gay furry too :3, i sometimes make stuff, sometimes things related to atproto, bluesky, etc. currently i'm working on rem blue - the bluesky roblox remote admin. i ditched discord unlike other remotes because i want it to be open"}
						<div className="h-1"/>
						<div className="space-x-1 text-foreground">
							<Link href="https://discord.gg/cQDvPtv3Dt"><Button variant="outline">Discord</Button></Link>
							<Link href="https://darktru.win"><Button variant="outline">Other Site</Button></Link>
						</div>
					</div>
				</div>
				<div className="pt-16 text-center max-sm max-w-96">
					<div className="font-extrabold text-xl">
						{"Mandatory BMF"}
					</div>
					<div className="text-muted-foreground/50 text-sm">
						{"look around, this is the \"be my friend\" component, inspired from countless tiktok slideshows, i made this using next.js + react + tailwind :3"}
					</div>
				</div>
				<BMFView/>
				<div className="w-96 text-left text-muted-foreground/50 text-xs">
					<strong>{"Be My Friend"}</strong>
					{" is a type of a TikTok slideshow containing things they like, what they are, their hobbies, etc. to find "}
					<Link href="https://fluentslang.com/what-does-moots-mean-in-slang/" className="underline decoration-dotted">moots</Link>.
				</div>
				
			</div>
		</>
	);
}

