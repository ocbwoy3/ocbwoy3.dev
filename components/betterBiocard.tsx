"use client";

import { defaultLinks } from "@/lib/constants";
import { ReactNode } from "react"

type Link = {
	title: string
	url: string
}

const links: Link[] = defaultLinks

export function Biocard() {

	let theCoolButtons: ReactNode[] = []
	
	links.forEach((link:Link,index:number)=>{
		// use client, just for this bullshit
		// why not just make the root layout.tsx use the fucking client rendering, that would break all my shit 
		const stupidFuckingFunction = () => {
			open(link.url)
		}
		theCoolButtons.push(
			<div className="w-full">
				<button key={index.toString()} onClick={stupidFuckingFunction} onClickCapture={stupidFuckingFunction} className="w-[95%] mt-2 text-red-500 decoration-red-500/50 text-lg border-red-500 rounded border-solid border-2 my-1 mx-2">
					<span className="underline" key={index.toString()}>{link.title}</span>
				</button>
			</div>
		)
	})

	return (
		<div className="flex-col h-11/12 rounded-md backdrop-blur-xl bg-white/10 text-white py-1">
			<div className="text-4xl text-red-600 py-4">OCbwoy3</div>
			{
				theCoolButtons.map(x=>x)
			}
		</div>
	)
}