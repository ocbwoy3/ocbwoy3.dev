import Link from 'next/link'
import { faBluesky } from "@fortawesome/free-brands-svg-icons/faBluesky";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DarkModeToggle } from './DarkModeToggle';
import { Separator } from '../ui/separator';

const Links: {name: string, url: string}[] = [
	{ name: "Home", url: "/" },
	{ name: "GBan Lookup", url: "/lookup" },
	{ name: "Skeeting Madness", url: "/MidnightSkeetingMadness" },
	{ name: "Replay", url: "/replay" }
]

export default function Footer() {

	const isDeveloper = process.env.NODE_ENV !== "production";

	return (
		<footer className="py-4 px-2 w-full">
			<Separator className="my-4"/>
			<span className="inline-flex space-x-2">
				<div className="w-2"/>
				{
					Links.map((a,i)=>(
						<span className="inline-flex space-x-2" key={i.toString()}>
							<Link href={a.url} className="text-muted-foreground hover:text-blue-700">
								{a.name}
							</Link>
							{ i !== Links.length-1 ? (<Separator orientation="vertical"/> ) : ""}
						</span >
					))
				}
			</span>
			<br/>
			<span className="inline-flex space-x-2 text-muted-foreground">
				<div className="w-2"/>
				<Link href={"https://bsky.app/profile/did:plc:s7cesz7cr6ybltaryy4meb6y"} className="w-6 h-6 hover:text-blue-700">
					<FontAwesomeIcon icon={faBluesky} className="w-6 h-6"/>
				</Link>
				<Link href={"https://github.com/ocbwoy3"} className="w-6 h-6 hover:text-blue-700">
					<FontAwesomeIcon icon={faGithub} className="w-6 h-6"/>
				</Link>
				<DarkModeToggle className="w-6 h-6"/>
				{ isDeveloper ? (
					<span className="pr-1 text-muted-foreground">
						<Link href={"https://github.com/ocbwoy3/ocbwoy3.dev/"}>
							{"env: "+process.env.NODE_ENV}
						</Link>
					</span>
				) : (<></>)}
			</span>
		</footer>
	);

}