"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

const splashTexts = ["rm -rf /*"];

export function UserBlockedYou({ name, sub }: { name: string, sub:string }) {
	const typedRef = useRef(null);
	const [finishedTyping, setFinishedTyping] = useState<boolean>(false);
	const [subtextAttrs, setSubtextAttrs] = useState<string>(" hidden");

	useEffect(() => {
		setTimeout(() => {
			const typed = new Typed(typedRef.current, {
				strings: [`@${name.slice(0,-1)}`],
				typeSpeed: 100,
				onComplete: (self) => {
					setFinishedTyping(true);
					self.destroy();
					setSubtextAttrs("")
				},
			});
		}, 1500);
	}, []);

	return (
		<div className="font-bold text-center text-indigo-600">
			<span>
				<span className={`text-sm${subtextAttrs}`}>{sub}</span><br/>
				<span className="text-transparent">⠀</span>
				<span
					className={finishedTyping ? "hidden" : ""}
					ref={typedRef}
				></span>
				<span className={finishedTyping ? "" : "hidden"}>
					@{name}
				</span>
				<span className="text-transparent">⠀</span>
			</span>
		</div>
	);
}
