"use client";

import { PropsWithChildren, ReactElement, ReactHTMLElement, ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { Button } from "../ui/button";

/* the static-ocbwoy3dev.darktru.win method */
const assets = "https://static-ocbwoy3dev.darktru.win/component/bmf/";

function Draggable({ children, uq, index, n, ...props }: PropsWithChildren & {uq: string, index: number, n: string}) {
	const [position, setPosition] = useState<{x: number, y: number}>(((window || global) as any).ocbwoy3dev_bmf_view[n] || { x: 0, y: 0 });
	
	const ref = useRef<HTMLDivElement>(null);

	useEffect(()=>{
		const e = ref.current?.getElementsByTagName("img")[0];
		if (!e) return;
		e.ondrag = (d)=>{
			const p = document.getElementById(`bmf_view_${uq}`)
			if (!p) return;
			const b: DOMRect = p?.getBoundingClientRect();
			let bruh = {
				x: d.pageX-b.left,
				y: d.pageY-b.top-(64*index)
			};
			((window || global) as any).ocbwoy3dev_bmf_view[n] = bruh;
			setPosition(bruh)
		}
	})
	
	return (
		<div ref={ref} className="relative" style={{top: position.y, left: position.x}}>
			{children}
		</div>
	)
}

export function BMFView() {

	const uq = "theonlyone"; // DEV ONLY

	const r = useRouter();
	
	const BMF_PRESET_POS: {[n: string]: {x: number, y: number}} = {
		"Discord": {
			"x": 306,
			"y": 16
		},
		"Roblox": {
			"x": 15,
			"y": 233
		},
		"Regretevator": {
			"x": 245,
			"y": 170
		},
		"PartyNoob": {
			"x": 183,
			"y": 99
		},
		"Gregoriah": {
			"x": 281,
			"y": -43
		},
		"Linux": {
			"x": 92,
			"y": -23
		},
		"Bluesky": {
			"x": 16,
			"y": -367
		},
		"atproto": {
			"x": 11,
			"y": -351
		},
		"TypeScript": {
			"x": 92,
			"y": -496
		},
		"vscode": {
			"x": 169,
			"y": -563
		}
	}

	const BMF_PRELOAD_ASSETS = [
		"Discord",
		"Roblox",
		"Regretevator",
		"PartyNoob",
		"Gregoriah",
		"Linux",
		"Bluesky",
		"atproto",
		"TypeScript",
		"vscode"
	];

	const BMF_ALT: {[a:string]: string} = {
		atproto: "AT Protocol",
		vscode: "Visual Studio Code"
	}

	const [BMFElements, setBMFElements] = useState<ReactElement[]>([]);
	const [BMFElementsDev, setBMFElementsDev] = useState<ReactElement[]>([]);
	const [isDeveloper, setIsDeveloper] = useState(process.env.NODE_ENV !== "production");
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(()=>{
		if (!((window || global) as any).ocbwoy3dev_bmf_view) ((window || global) as any).ocbwoy3dev_bmf_view = {};
		let elements: ReactElement[] = [];
		let elementsDev: ReactElement[] = [];
		BMF_PRELOAD_ASSETS.forEach((n, index)=>{
			((window || global) as any).ocbwoy3dev_bmf_view[n] = BMF_PRESET_POS[n] || { x: 0, y: 0 };
			elementsDev.push(
				<Draggable key={index+n} uq={uq} index={index} n={n}>
						<img id="draggable" className="h-16 z-50 flex-none" src={assets+n.toLowerCase()+".png"} alt={BMF_ALT[n.toLowerCase()] || n}/>
				</Draggable>
			)
			elements.push(
				<div key={index+n} className="relative" style={{
					left: ((window || global) as any).ocbwoy3dev_bmf_view[n].x,
					top: ((window || global) as any).ocbwoy3dev_bmf_view[n].y
				}}>
					<img className="h-16 z-50 flex-none" src={assets+n.toLowerCase()+".png"} alt={BMF_ALT[n.toLowerCase()] || n}/>
				</div>
			)
		})
		setBMFElements(elements);
		setBMFElementsDev(elementsDev);
		setIsLoaded(true);
	},[])

	return (
		<div suppressHydrationWarning>
			<div className="text-xl font-bold text-center underline decoration-dotted" onClick={()=>{r.push("https://www.allacronyms.com/BMF/Be_My_Friend")/* could be /dictionary/[slug] */}}>{"bmf?"}</div>
			<div className="h-2"/>
			{/* css is too difficult i wanna make my bmf component look like the ones in tiktok slideshows */}
			<div className={"w-96 h-96 z-50 grid place-items-start border border-muted"}>
				{ isLoaded ? (
					<div key="bmfviewreal" id={`bmf_view_${uq}`} className="">
						{ isDeveloper ? BMFElementsDev.map(a=>a) : BMFElements.map(a=>a)}
					</div>
				) : "Loading..." }
			</div>
			{ isDeveloper ? (
				<>
					<div className="h-1"/>
					<div className="space-x-1">
						<Button variant="outline" onClick={()=>{
							const j = JSON.stringify(((window || global) as any).ocbwoy3dev_bmf_view,undefined,"\t")
							window.navigator.clipboard.writeText(j);
						}}>Copy JSON</Button>
						<Button variant="outline" onClick={()=>{
							console.log(((window || global) as any).ocbwoy3dev_bmf_view)
						}}>Log Positions</Button>
						<Button variant="outline" onClick={()=>{
							setIsDeveloper(false);
						}}>Exit</Button>
					</div>
					<div className="h-2"/>
				</>
			) : (<>
				<div className="h-1"/>
				<span onClick={()=>setIsDeveloper(true)} className="text-sm text-muted-foreground">{"Made 100% entirely in React + Tailwind 😎"}</span>
			</>)}
		</div>
	);

}
