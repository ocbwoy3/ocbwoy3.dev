import { Suspense } from "react";
import { Metadata } from "next";
import Starfield from "@/components/pages/Starfield";
import { Title } from "@/components/pages/Title";
import { ScrollBMF } from "@/components/pages/ScrollBMF";
import { BMFView } from "@/components/pages/bmf";
import BouncingImage from "@/components/pages/DVDLogoBounce";

export const metadata: Metadata = {
	title: "OCbwoy3",
	description:
		"OCbwoy3 starts here. On a device or on the web, you can discover more about me. Join our Discord to learn more!",
};

export default function Page() {
	return (
		<>	
			<span className="fixed w-screen h-screen top-0 left-2 z-40">
				{"work in progress, will update later"}
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
			<div className="fixed text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-32 flex justify-center items-center z-30 transition-opacity duration-300 ease-in-out">
				<BMFView />
			</div>
		</>
	);
}
