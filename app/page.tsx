import { ReactNode, Suspense } from "react";
import { Metadata } from "next";
import Starfield from "@/components/pages/Starfield";
import { Title } from "@/components/pages/Title";
import { BMFTHing } from "@/components/pages/BMFThing";
import { BMFView } from "@/components/pages/bmf";
import { Link } from "bsky-react-post";

export const metadata: Metadata = {
	title: "OCbwoy3",
	description:
		"OCbwoy3 starts here. On a device or on the web, you can discover more about me. Join our Discord to learn more!",
};

const bsky = "https://bsky.app/profile/did:plc:s7cesz7cr6ybltaryy4meb6y";

const links: [string, string, string][] = [
	["Bluesky", "text-blue-700", bsky],
	["Discord", "text-fuchsia-700", "https://discord.gg/Nvpzc3dDSz"],
	["Xitter", "text-green-700", bsky],
	["Twitch", "text-red-700", bsky],
	["Instagram", "text-orange-700", bsky],
	["Mastodon", "text-cyan-700", "https://m.darktru.win/@ocbwoy3"],
];

export default function Page() {
	return (
		<>
			<span className="absolute x-3 y-3 z-[70] font-black">
				<span className="text-transparent">|</span>
				{links.map((link, i) => (
					<span key={i}>
						<Link href={link[2]} className={link[1]}>
							{link[0]}
						</Link>{" "}
					</span>
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
			<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-30">
				<BMFTHing />
			</div>
		</>
	);
}
