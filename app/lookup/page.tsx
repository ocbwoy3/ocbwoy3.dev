/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import { BanEntry, BanReturns, getBanInformation } from "@/lib/gban/gban";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Metadata } from "next";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function Page() {
	const params = useSearchParams();
	const username: string | null = params.get("u");

	const [banInfo, setBanInfo] = useState<BanReturns | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const wtf = () => {
		setBanInfo(null);
	};

	useEffect(() => {
		((window || global) as any).setBanInfo = (x: BanReturns | null) => {
			setBanInfo(x);
		};
		(async () => {
			try {
				if (username) {
					toast("ocbwoy3.dev", {
						description: "Fetching inital user",
					});

					const x: BanReturns | null = await getBanInformation(
						username
					);

					if (x) {
						setBanInfo(x);
					}
				}
			} catch {}
		})();
	}, []);

	const inputRef = React.useRef<any>();

	return (
		<div className="block">
			<div className="h-3" />
			<span className="inline-flex gap-x-2">
				<div className="w-2" />
				<Input
					placeholder="Roblox Username"
					className="text-text"
					ref={inputRef}
				/>
				<Button
					onClick={() => {
						console.log(inputRef.current.value);
						setIsLoading(true);
						getBanInformation(inputRef.current.value)
							.then((a) => {
								setBanInfo(a);
								setIsLoading(false);
							})
							.catch(() => {
								setBanInfo(null);
								setIsLoading(false);
							});
					}}
					variant="outline"
				>
					Search
				</Button>
			</span>
			<br />
			<div className="inline-flex">
				<div className="w-4" />
				<br />
				<span>
					{isLoading === false ? (
						<>
							{banInfo ? (
								<>
									<br />
									<Alert className="inline-flex">
										<Avatar className="w-8 h-8">
											<img
												alt=""
												src={
													banInfo.profilePicture
														.length === 0
														? "/placeholder_pfp.webp"
														: banInfo.profilePicture
												}
											/>
										</Avatar>
										<div className="pl-3">
											<AlertTitle className="font-bold font-sans">
												{banInfo.displayName}{" "}
												<span className="text-muted-foreground font-mono pl-2">
													{banInfo.username} /{" "}
													{banInfo.userId}
												</span>
											</AlertTitle>
										</div>
									</Alert>
									<br />
									<br />
									{banInfo.bans.map((ban) => (
										<Alert
											key={
												ban.banProvider +
												ban.banProviderIcon
											}
											className="inline-flex"
										>
											<Avatar className="w-8 h-8">
												<img
													alt=""
													src={
														ban.banProviderIcon
															.length === 0
															? "/placeholder_pfp.webp"
															: ban.banProviderIcon
													}
												/>
											</Avatar>
											<div className="w-2" />
											<div>
												<AlertTitle className="font-bold">
													{ban.banProvider}
												</AlertTitle>
												<AlertDescription>
													{ban.reason}
												</AlertDescription>
												<AlertDescription className="text-muted-foreground inline-flex font-mono">
													{ban.permBan ? (
														<>
															<Badge variant="outline">
																Banned Forever
															</Badge>
															<div className="w-1" />
														</>
													) : (
														""
													)}
													{ban.crashBan ? (
														<>
															<Badge variant="outline">
																Crash Ban
															</Badge>
															<div className="w-1" />
														</>
													) : (
														""
													)}
													<Badge variant="outline">
														Moderator:{" "}
														{ban.moderator}
													</Badge>
												</AlertDescription>
											</div>
										</Alert>
										// <div key={ban.banProvider+ban.banProviderIcon} className="p-2 bg-muted rounded-lg inline-flex">
										// 	<Avatar className="w-16 h-16"><img src={ban.banProviderIcon}/></Avatar>
										// 	<div className="w-2"/>
										// 	<div>
										// 		<span className="font-bold text-xl">{ban.banProvider}</span>
										// 		<br/>
										// 		<span className="text-muted-foreground">{ban.reason}</span>
										// 		<br/>
										// 		<span className="text-muted-foreground text-sm">{ban.permBan ? "(Banned Forever) " : ""}{ban.crashBan ? "(Crash Ban) " : ""}{ban.moderator ? `Moderator: ${ban.moderator}` : ""}</span>
										// 	</div>
										// </div>
									))}
								</>
							) : (
								"Here's some users you can try looking up: DoubleRainbowXT, iloveyou_burebista, BobTheEpicGam"
							)}
						</>
					) : (
						"LOADING..."
					)}
				</span>
			</div>
		</div>
	);
}
