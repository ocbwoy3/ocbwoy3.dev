"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

/* r2.ocbwoy3.dev doesn't work as it's blocked by orb, use darktru.win instead */
const assets = "https://static-ocbwoy3dev.darktru.win/component/bmf/";

export function BMFView() {

	const r = useRouter();

	const BMF_CLASS = "...";

	const BMF_PRELOAD_ASSETS = [
		"latvia",
		"discord",
		"roblox",
		"linux",
		"bluesky",
	].map(a=>(assets+a+".png"));

	const [isLoaded, setIsLoaded] = useState(true);

	return (
		<div>
			<div className="text-xl font-bold text-center underline decoration-dotted" onClick={()=>{r.push("/bmf/info")/* /dictionary/[slug] */}}>{"bmf?"}</div>
			<div className="h-2"/>
			{/* css is too difficult i wanna make my bmf look like the ones in tiktok slideshows */}
			<div className={"w-96 h-96 z-50 grid place-items-start border border-muted"}>
				{ isLoaded ? (
					<div className="flex flex-wrap">
						<img className="h-16" src={assets+"latvia.png"} alt="Latvia"/>
						<img className="h-16" src={assets+"discord.png"} alt="Discord"/>
						<img className="h-16" src={assets+"roblox.png"} alt="Roblox"/>
						<img className="h-16" src={assets+"linux.png"} alt="Linux"/>
						<img className="h-16" src={assets+"bluesky.png"} alt="Bluesky"/>
					</div>
				) : "Loading..." }
			</div>
		</div>
	);

}
