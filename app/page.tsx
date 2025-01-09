import { ReactNode, Suspense } from "react";
import { Metadata } from "next";
import Starfield from "@/components/pages/Starfield";
import { Title } from "@/components/pages/Title";
import { BMFTHing } from "@/components/pages/BMFThing";
import { BMFView } from "@/components/pages/bmf";
import { Link } from "bsky-react-post";
import { Badge } from "@/components/ui/badge";
import { UserBlockedYou } from "@/components/lol/UserHasBlockedYou";
import { Status } from "@/components/pages/Status";
import { Stat } from "@/components/pages/StatusJSON";

export const metadata: Metadata = {
	title: "OCbwoy3",
	description:
		"OCbwoy3 starts here. On a device or on the web, you can discover more about me. Join our Discord to learn more!",
};

const bsky = "https://bsky.app/profile/did:plc:s7cesz7cr6ybltaryy4meb6y";

const links: [string, string, string][] = [
	["Bluesky", "blue-700", bsky],
	["Discord", "fuchsia-700", "https://discord.gg/Nvpzc3dDSz"],
	["Xitter", "green-700", bsky],
	["Twitch", "red-700", bsky],
	["Instagram", "orange-700", bsky],
	["Mastodon", "cyan-700", "https://m.darktru.win/@ocbwoy3"],
];

export default function Page() {
	return (
		<>
			<span className="absolute x-3 y-3 z-[70] font-black space-x-1 pt-2 pl-4">
				{links.map((link, i) => (
					<Link
						key={i}
						href={link[2]}
						className={`text-${link[1]} border-${link[1]}`}
					>
						<Badge
							variant="outline"
							key={i}
							className={`font-mono opacity-100 brightness-200 text-${link[1]} border-${link[1]}`}
						>
							{link[0]}
						</Badge>
					</Link>
				))}
			</span>

			<span className="fixed inset-0 w-screen h-screen flex items-center justify-center z-20 bg-black">
				<Starfield
					starCount={1000}
					starColor={[255, 255, 255]}
					speedFactor={0.4}
					backgroundColor="black"
				/>
			</span>
			<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-30">
				<Title />
			</div>
			<div className="fixed bottom-16 w-screen content-center flex items-center justify-center z-30 select-none">
				<div className="text-center">
					<Status/><br/>
					<div className="font-mono text-sm text-blue">live from api.ocbwoy3.dev</div><br/>
					<div className="font-mono text-xs text-blue"><Stat jsonEntry="numBans" defaultValue={0}/> banned users</div>
				</div>
			</div>
			<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-30">
				<BMFTHing />
			</div>
		</>
	);
}
