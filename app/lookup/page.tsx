"use client";

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
import { Suspense, useEffect, useState } from "react"
import { UsernamePromptModal } from "@/components/username-prompt-modal"
import { Metadata } from "next"
import { useSearchParams } from "next/navigation";

export default function Home() {

	const params = useSearchParams()
	const username: string|null = params.get('u')

	const [banInfo, setBanInfo] = useState<BanReturns | null>(null)

	const wtf = () => { setBanInfo(null) }

	let openUsernameInputModal = () => {
		((window || global) as any).openUsernameInputModal()
	}

	useEffect(() => {
		((window || global) as any).setBanInfo = (x: BanReturns | null) => { setBanInfo(x) }
		(async()=>{
			try {
				if (username) {
					toast({
						title: "ocbwoy3.dev",
						description: "Fetching inital user"
					})
				  
					  // console.log('fetching')
				  
					const x: BanReturns | null = await getBanInformation(username)
				  
					  // console.log('fetchd',x)
				  
					if (x) {
						setBanInfo(x);
						// console.log('sbi')
					}
				}
			} catch {}
		})()
	}, [])


	return (
		<>
			{banInfo ? (
				<div className="absolute top-[10px] left-[10px] z-20">
					<Button onClick={openUsernameInputModal} className="pointer-events-auto">Lookup</Button>
				</div>
			) : (<></>)}
			<UsernamePromptModal />

			{banInfo ? (
				<div className="w-screen h-screen absolute flex items-center justify-center z-10">
					<div className="grid-cols-1">
						<GlobalBanShowThingy banData={banInfo} />
					</div>
				</div>
			) : (
				<div className="w-screen h-screen absolute flex items-center justify-center z-10">
					<div className="grid-cols-1 text-center">
						<span className="lg-large">Click the button below to get started!</span>
						<br /><br />
						<Button onClick={openUsernameInputModal}>Search Global Bans</Button>
					</div>
				</div>
			)}
		</>
	);
}
