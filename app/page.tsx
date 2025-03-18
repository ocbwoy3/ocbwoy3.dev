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
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "OCbwoy3",
	description:
		"OCbwoy3 starts here. On a device or on the web, you can discover more about me. Join our Discord to learn more!",
};

const bsky = "https://bsky.app/profile/did:plc:s7cesz7cr6ybltaryy4meb6y";

const links: [string, string, string][] = [
	["Bluesky", "blue-700", bsky],
	["Discord", "fuchsia-700", "https://discord.gg/Nvpzc3dDSz"],
];

export default function Page() {
	return (
		<div className="max-h-screen">
			<span className="fixed inset-0 w-screen h-screen max-h-screen flex items-center justify-center z-20 bg-black">
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
		</div>
	);
}
