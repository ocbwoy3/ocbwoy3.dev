"use client";

import { Metadata } from "next";
import { Stat } from "@/components/pages/StatusJSON";
import { use112Bans } from "@/hooks/use-112-bans";

function HallOfShameEntry({name, reason, userid}: { name: string, reason: string, userid: string }) {
	return (
		<div className="py-2 font-mono">
			<a href={`https://roblox.com/users/${userid}/profile`} className="text-sm text-blue decoration-blue underline entry-name">{name}</a>
			<p className="text-xs text-muted-foreground">{reason}</p>
		</div>
	);
}

export default function HallOfShamePage() {
	const bans = use112Bans();

	return (
		<div className="text-center font-sans">
			<br/>
			<h2 className="text-sm">Welcome to the...</h2>
			<h1 className="font-bold text-2xl">HALL OF SHAME</h1>
			<br />
			<div className="text-blue">
				We have banned{" "}
				<span className="font-bold">
					<Stat
						jsonEntry="numBans"
						defaultValue={
							<>
								an unknown amount of{" "}
							</>
						}
					/>
				</span>
				{" "}users using the 112 ban manager.
			</div>
			From skids to pedophiles to menaces to society, this list contains everyone who {"we've"} banned.
			<div className="pt-2 space-y-2">
				{
					Object.entries(bans).map(([id, ban], idx)=>(<HallOfShameEntry key={idx} userid={id} name={`${id} - Banned by ${ban.Moderator}`} reason={ban.Reason} />))
				}
			</div>
		</div>
	);
}
