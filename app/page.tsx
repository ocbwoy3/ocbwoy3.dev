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


const FormSchema = z.object({
	robloxUsername: z.string()
		.min(3,{message: "Username must be 3-20 characters long."})
		.max(20,{message:"Username must be 3-20 characters long."})
		.regex(/^[a-zA-Z0-9%.%_]+$/i,{message:"Invalid Username."}),
})

import { GlobalBanShowThingy } from "@/components/global-ban-show-thingy";
import Image from "next/image";
import { BanEntry, BanReturns, getBanInformation } from "@/lib/banParser"
import { useState } from "react"

export default function Home() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			robloxUsername: "",
		},
	})

	const [banInfo,setBanInfo] = useState<BanReturns|null>(null)

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		})
		const x: BanReturns|null = await getBanInformation(data.robloxUsername)
		if (x) setBanInfo(x);
	}

	return (
		<>
			<div className="absolute bottom-[10px] left-[10px] text-xs text-muted-foreground">
				© OCbwoy3 2024-present<br/>
				Karma, Nova and TGP APIs provided by third parties. - This website is <a href="https://github.com/ocbwoy3/ocbwoy3.dev/" className="inline_button">open source</a>!
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
					<FormField
						control={form.control}
						name="robloxUsername"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Roblox Username</FormLabel>
								<FormControl>
									<Input placeholder="OCboy3" {...field} />
								</FormControl>
								<FormDescription>
									Enter a valid Roblox Username to check for global bans. For information about appealing them, please visit <a href="https://docs.ocbwoy3.dev/docs/112/appeal/" className="inline_button">the documentation</a>.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
			{ banInfo ? (
				<GlobalBanShowThingy banData={banInfo}/>
			) : (<></>) }
		</>
	);
}
