"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

const splashTexts = [
	"rm -rf /*"
];

export function Title() {
	const typedRef = useRef(null);
	const [finishedTyping, setFinishedTyping] = useState<boolean>(false);
	const [splashText, setSplashText] = useState<string>("");

	const thingToTypeOut = "hi - doqe";

	useEffect(() => {
		const randomSplash =
			splashTexts[Math.floor(Math.random() * splashTexts.length)];
		setSplashText(randomSplash);

		setTimeout(() => {
			const typed = new Typed(typedRef.current, {
				strings: [
					thingToTypeOut.substring(0, thingToTypeOut.length - 1),
				],
				typeSpeed: 50,
				onComplete: (self) => {
					setFinishedTyping(true);
					self.destroy();
				},
			});
		}, 1500);
	}, []);

	return (
		<div className="font-bold text-center text-blue font-mono">
			<div
				className="text-yellow font-bold text-base z-30 animatre"
				style={{
					// width: 0,
					height: 0,
					transform: "translate(100px,20px) rotate(-12deg)",
				}}
			>
				{splashText}
			</div>
			<span className="text-4xl">ocbwoy3.dev</span>
			<br />
			<span>
				<span className="text-transparent">⠀</span>
				<span
					className={finishedTyping ? "hidden" : ""}
					ref={typedRef}
				></span>
				<span className={finishedTyping ? "" : "hidden"}>
					{thingToTypeOut}
				</span>
				<span className="text-transparent">⠀</span>
			</span>
		</div>
	);
}