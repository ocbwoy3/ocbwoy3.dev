"use client";

import { DiscordTimestamp } from "@skyra/discord-components-core";
import { DiscordMessages, DiscordMessage } from "@skyra/discord-components-react";
import { useEffect, useState } from "react";

function Message(props: {msg: string, author: string, pfp: string, time:string}) {
	
	const [isClient, setIsClient] = useState<boolean>(false);

	useEffect(()=>{
		setIsClient(true);
	},[])

	if (!isClient) return;
	
	// <img src="https://cdn.discordapp.com/avatars/942180574133645312/63fab115c6539f4bb7518b8a7108d1a6.webp?size=80">
	// <img src="https://ugc.decor.fieryflames.dev/2156c3db318f741525d65bcd550e0a81.png">
	return (
		<div className="border-none">
			<DiscordMessages>
				<DiscordMessage author={props.author} avatar={props.pfp} timestamp={props.time}>
					{props.msg}
				</DiscordMessage>
			</DiscordMessages>
		</div>
	)
}

export default function Page() {
	return (
		<>
			{/* messages */}
			<div className="absolute top-[10px] left-[10px] w-[400px] rounded p-1.5 bg-[#36393e] border-none">
				<code className="font-bold"><span className="text-slate-500">{"<"}</span><span className="text-green-500">{"Messages"}</span><span className="text-slate-500">{"/>"}</span></code>
				<Message msg="test" author="エゼキエル" pfp="/pfp/zeke.webp" time="07/23/2024 7:04 PM"/>
				<Message msg="test" author="Equsjd" pfp="/pfp/soup.webp" time="07/24/2024 10:38 PM"/>
				<Message msg="test" author="エゼキエル" pfp="/pfp/zeke.webp" time="Today at 1:34 AM"/>
			</div>
		</>
	)
}