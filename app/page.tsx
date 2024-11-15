import { BMFView } from "@/components/pages/bmf";
import { Title } from "@/components/site/SiteNameHeader";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { toast } from "sonner";
import { Post } from "bsky-react-post";

export const metadata: Metadata = {
	title: {default: "Welcome", template: "OCbwoy3's %s"},
	description: "The website",
};

export default function Page() {
	return (
		<>
			<div className="h-8"/>
			<Title/>
			<div className="w-full grid place-items-center">
				<div className="pt-16 text-center max-sm max-w-96">
				<div className="font-extrabold text-xl">
						{"Hey, I'm OCbwoy3."}
					</div>
					<div className="text-muted-foreground/50">
						{"I am a gay furry, nobody is supposed to know that, yet."}
					</div>					
				</div>
				<div className="w-full flex justify-center items-center px-4 py-8"> {/* FIX THIS CLASS */}
					{/* <Post did="did:plc:s7cesz7cr6ybltaryy4meb6y" id="3laxy3upo7c25"/> */}
				</div>
				<div className="text-red-500">{"The \"Be My Friend\" component is still work in progress!"}</div>
				<div className="text-muted text-sm">{"Trying to make it look like from a TikTok Slideshow. You can contribute if you want to."}</div>
				<BMFView/>
			</div>
		</>
	);
}

