import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
	title: "REM's Server Rules",
	description: "You must follow them or you will be banned from our Discord.",
	formatDetection: {
		telephone: false,
		date: false,
		address: false,
		email: false,
		url: false
	}
};

export default function Legal() {

	type Rule = {
		title: string,
		description: string|ReactNode,
		punishment?: string
	}

	const rules: Rule[] = [
		{
			title: "Discord's Terms",
			description: (<span>{"You must follow "}<a href="https://dis.gd/terms" className="text-cyan-400 underline">{"Discord's terms of service"}</a>{" in order to participate in our Discord server. However, please note that you are allowed to use client modifications in our server as we don't care. However, self-bots are banned."}</span>),
			punishment: "Ban"
		},
		{
			title: "13+ Only",
			description: "You must be at least 13 years old or of the minimum legal age to use Discord in your country or jurisdiction.",
			punishment: "Banned until your 13th birthday"
		},
		{
			title: "No Porn",
			description: "You may not send porn in our server, unless it's in a channel marked as Age-Restricted.",
			punishment: "Kick"
		},
		{
			title: "Swearing",
			description: "Swearing is allowed, but for words like the N-word or discriminating against a person or a group of individuals is forbidden.",
			punishment: "24h Timeout"
		},
		{
			title: "No Abuse",
			description: (<span>
				{"You may not disrupt any active sessions by ending the session or by running abusive scripts. However, you can "}
				<a href="https://github.com/ocbwoy3/rem?tab=readme-ov-file#hosting-rem" className="text-cyan-400 underline">{"host your own REM"}</a>
				{", where our rules won't apply."}</span>),
			punishment: "Blacklist"
		},
		{
			title: "Advertising",
			description: "You may not advertise your Discord Server unless allowed by an administrator. This includes DMing fellow server members.",
			punishment: "Kick"
		},
		{
			title: "Handle Impersonation",
			description: "You may not abuse the handle change command to impersonate goverment entitited or any similar, such as changing your handle to cia.gov or president.lv.",
			punishment: "Handle Change Ban"
		},
		{
			title: "Issues",
			description: (<span>
				{"You should report any issues, vulnerabilities, bugs or suggest new features or ideas by "}
				<a href="https://github.com/ocbwoy3/rem/issues/new" className="text-cyan-400 underline">{"making your own issue"}</a>
				{" on our GitHub."}
			</span>)
		}
	]

	let wtf: ReactNode[] = []

	rules.forEach((rule: Rule, index: number) => {
		wtf.push(
			<div key={index.toString()}>
				<div className="text-2xl text-black">{rule.title}</div>
				<div className="text-sm">{rule.description}</div>
				{ rule.punishment ?
					(<div className="text-sm text-red-600">{"Punishment: "}{rule.punishment}</div>) : (<></>)
				}
				<br/>
			</div>
		)
	})

	return (
		<div className="py-16 px-32 text-muted-foreground text-lg">
			<div className="text-black text-3xl">Server Rules</div>
			{"You are to follow these rules on our Discord server at all times."}
			<br/>
			<br/>
			
			<>
				{wtf.map(x=>x)}
			</>
		</div>
	)
}