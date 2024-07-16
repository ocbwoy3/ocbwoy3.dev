"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

import { GlobalBanShowThingy } from "@/components/global-ban-show-thingy";
import Image from "next/image";
import { BanEntry, BanReturns, getBanInformation } from "@/lib/banParser"
import { useEffect, useState } from "react"
import { UsernamePromptModal } from "@/components/username-prompt-modal"

export default function Home() {

	const [banInfo, setBanInfo] = useState<BanReturns | null>(null)

	const wtf = () => { setBanInfo(null) }

	let openUsernameInputModal = () => {
		((window || global) as any).openUsernameInputModal()
	}

	useEffect(() => {
		((window || global) as any).setBanInfo = (x: BanReturns | null) => { setBanInfo(x) }
	}, [])

	return (
		<>
			{banInfo ? (
				<div className="absolute top-[10px] left-[10px]">
					<Button onClick={openUsernameInputModal} className="pointer-events-auto">Lookup</Button>
				</div>
			) : (<></>)}
			<UsernamePromptModal />
			<div className="absolute bottom-[10px] left-[10px] text-xs text-muted-foreground">
				© OCbwoy3 2024-present &mdash; <a href="https://github.com/ocbwoy3/ocbwoy3.dev/" className="inline_button">GitHub</a><br />
				APIs for Karma, Nova and the Goober Project are provided by third parties.
			</div>

			<div className="w-screen h-screen absolute flex items-center justify-center z-10 pointer-events-none">
				{banInfo ? (
					<GlobalBanShowThingy banData={banInfo} className="pointer-events-auto" />
				) : (
					<div className="grid-cols-1 text-center">
						<span className="lg-large">Welcome to OCbwoy3&apos;s Global Ban Checker!<br/>Click the button below to get started!</span>
						<br/><br/>
						<Button onClick={openUsernameInputModal} className="pointer-events-auto">Search Global Bans</Button>
					</div>
				)}
			</div>
		</>
	);
}
