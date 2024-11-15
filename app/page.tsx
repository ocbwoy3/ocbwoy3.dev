import { Title } from "@/components/site/SiteNameHeader";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { toast } from "sonner";

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
			</div>
		</>
	);
}

