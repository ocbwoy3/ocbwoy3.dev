'use client';

import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

export function Title() {
	const typedRef = useRef(null);
	const [finishedTyping, setFinishedTyping] = useState<boolean>(false);
	
	const thingToTypeOut = "the one and only";

	useEffect(()=>{
		setTimeout(()=>{
			const typed = new Typed(typedRef.current,{
				strings: [
					thingToTypeOut.substring(0,thingToTypeOut.length-1)
				],
				typeSpeed: 100,
				onComplete: (self)=>{
					setFinishedTyping(true);
					self.destroy();
				}
			});
		},1500);
	},[]);

	return (
		<div className="font-bold text-center">
			<span className="text-3xl">ocbwoy3.dev</span><br/>
			<span>
				<span className="text-transparent">⠀</span>
				<span className={finishedTyping ? "hidden" : ""} ref={typedRef}></span>
				<span className={finishedTyping ? "" : "hidden"}>{thingToTypeOut}</span>
				<span className="text-transparent">⠀</span>
			</span>
		</div>
	)
}