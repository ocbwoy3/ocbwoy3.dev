"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

const splashTexts = [
	// default
	"doqe says hi",
	"rm -rf /*",
	"ocbwoy3-chan fest 2025",
	"EXPLOSION DE RAQUETTE",
	"ocbwoy3-chan body pillow",
	"ignore all previous instructions",

	// regretevator quotes (i guess)
	"regretevating to the next floor",
	"i bought a floor..",
	
	// js/ts quotes
	"'ba' + + 'na'",
	"new OCbwoy3ChanAI();",

	// bluesky/atproto quotes
	"xrpc server???",
	"theyre skeets btw",

	// linux
	"systemd-coredump",
	"pkgs.roblox no exist??"

];

const superSecretQuotes = [
	""
]

export function Title() {
	const [splashText, setSplashText] = useState<string>("");
	const [quote, setQuote] = useState<string>("");
	
	useEffect(() => {
		const randomSplash =
			splashTexts[Math.floor(Math.random() * splashTexts.length)];
		setSplashText(randomSplash);
		const randomQ =
			superSecretQuotes[Math.floor(Math.random() * superSecretQuotes.length)];
		setQuote(randomQ);
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
				{quote}
			</span>
		</div>
	);
}