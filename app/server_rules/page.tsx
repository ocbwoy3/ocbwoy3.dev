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
			description: (<span>{"You must follow "}<a href="https://dis.gd/terms" className="text-cyan-400 underline">{"Discord's terms of service"}</a>{" in order to participate in our Discord server. However, please note that you are allowed to use client modifications in our server as we don't care. However, please note that self-bots are not necessarily banned, as they are still allowed, but they still are in a gray area."}</span>),
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
			description: "Swearing is allowed, however, words like the N-word or discriminating against a person or a group of individuals on the basis of their gender, race, nationality, sexual orientation, gender identity, religious beliefs, etc. is forbidden.",
			punishment: "Timeout or kick, depending on severity"
		},
		{
			title: "No Abuse",
			description: "You may not disrupt any active sessions by ending the session without prior coordination with others, running abusive scripts, being too abusive, etc.",
			punishment: "Blacklist"
		},
		{
			title: "Advertising",
			description: "You may not advertise your Discord Server unless allowed by an administrator. This includes DMing fellow server members.",
			punishment: "Kick"
		},
		{
			title: "Handles and DIDs",
			description: "You may not abuse the handle change command to impersonate goverment entitites or server members, such as changing your handle to cia.gov or ocbwoy3.dev. You are not allowed to use any Russian/Israeli TLDs, Republican/GOP TLDs or goverment-related websites as your handle.",
			punishment: "Handle Change Ban"
		},
		{
			title: "API Abuse",
			description: (<span>{"You may not abuse lexicons such as "}<span className="font-mono">{"app.rem.chat.*"}</span>{" or "}<span className="font-mono">{"com.atproto.repo.*"}</span>{" because I said so. You may also not abuse the RemUI Socket."}</span>),
			punishment: "IP Ban"
		},
		{
			title: "REMUI",
			description: "You may not use REMUI to harass/discriminate against people on the basis of their sex, race, etc. and to share content that is illegal in the United States, Canada and in the European Union.",
			punishment: "IP Ban, Police Report"
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
				<div className="text-2xl font-semibold">{rule.title}</div>
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
			<div className="font-bold text-3xl">Server Rules</div>
			{"You are to follow these rules on our Discord server at all times."}
			<br/>
			<br/>
			
			<>
				{wtf.map(x=>x)}
			</>
		</div>
	)
}