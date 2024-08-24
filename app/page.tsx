import { Biocard } from "@/components/betterBiocard";
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Welcome to ocbwoy3.dev",
	description: "Stop and chill at my homepage.",
	formatDetection: {
		telephone: false,
		date: false,
		address: false,
		email: false,
		url: false
	}
};

function GlowingText({children}: {children: React.ReactNode}) {
	return (
		<>
			<span className="absolute mx-auto py-4 flex border w-[100%] h-[100%] bg-gradient-to-r blur-3xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl box-content font-extrabold text-transparent text-center select-none">
				{children}
			</span>
			<h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto">
				{children}
			</h1>
		</>
	)
}

type Link = {
	title: string
	url: string
}

const links: Link[] = [
	{title:"Global Ban Lookup",url:"/lookup"},
	{title:"Ban Appeals",url:"/appeal"},
	{title:"Discord",url:"https://discord.gg/y3xCjzFUDK"}
]

function Spoiler({children}: {children: ReactNode}) {
	return (
		<span className="bg-white text-white hover:text-white hover:bg-black pointer-events-auto z-[20]">{children}</span>
	)
}

export default function Welcome() {

	const linkNodes: ReactNode[] = []

	links.forEach((link:Link,index:number)=>{
		linkNodes.push(
			<span key={index.toString()} className="text-red-500 decoration-red-500/50">
				{"> "}<a href={link.url} className="underline" key={index.toString()}>{link.title}</a>
			</span>
		)
	})

	return (
		<div className="flex w-screen h-screen bg-black">

			{/* Background */}
			<Image className="absolute z-[2] w-screen h-screen object-cover" src="https://cdn.ocbwoy3.dev/assets/rice.png" alt="" width={1920} height={1080}></Image>

			{/* Links */}
			{/* <div className="text-red-500 text-lg font-mono top-[15px] left-[15px] absolute z-[200] flex flex-col space-y-1">
				{
					linkNodes.map(x=>x)
				}
			</div> */}

			{/* Biocard */}
			<center className="absolute w-full h-full z-[30] flex flex-col items-center justify-center">
				<div className="max-w-xs mx-auto sm:w-[95vw] absolute">
					<Biocard />
				</div>
			</center>

		</div>
	)
}