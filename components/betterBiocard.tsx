
// wtf is this

import { ReactNode } from "react"

type Link = {
	title: string
	url: string
}

const links: Link[] = [
	{title:"GBan Lookup",url:"/lookup"},
	{title:"112 Ban Appeal",url:"/appeal"},
	{title:"Discord",url:"https://discord.gg/y3xCjzFUDK"},
	{title:"MC Server",url:"/mc"}
]

export function Biocard() {

	let theCoolButtons: ReactNode[] = []
	
	links.forEach((link:Link,index:number)=>{
		theCoolButtons.push(
			<div key={index.toString()} className="mt-2 text-red-500 decoration-red-500/50 rounded border-solid border-2">
				<a href={link.url} className="underline" key={index.toString()}>{link.title}</a>
			</div>
		)
	})

	return (
		<div className="flex-col h-11/12 rounded-md backdrop-blur-xl bg-white/10 text-white">
			<div className="text-4xl text-red-600">ocbwoy3.dev</div>
			{
				theCoolButtons.map(x=>x)
			}
		</div>
	)
}