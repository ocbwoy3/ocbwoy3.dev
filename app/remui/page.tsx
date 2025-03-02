"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { WSClient } from "./remui_socket/WSClient";
import { Separator } from "@/components/ui/separator";
import { AnySocketEvent, onWSEvent, onWSLog, SocketRecvMessageType, SocketSendMessageType } from "./remui_socket/WSEvent";
import { FloatingChatBar } from "./components/ChatBar";

export default function Page() {
	
	const blockRef = useRef<HTMLDivElement>(null);
	const jwtInputRef = useRef<HTMLInputElement>(null);
	const pdsInputRef = useRef<HTMLInputElement>(null);
	
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [initalConnectionError, setInitalConnectionError] = useState<boolean>(false);
	const [why, setWhy] = useState<number>(Date.now());

	const [logEntriesR, setLogEntriesR] = useState<ReactNode[]>([
		<div key="0" className="font-light">
			<span className="font-bold h-full">{"[SOCKET] "}</span><span className="whitespace-pre-wrap">{"REM - Remote Admin"}</span>
		</div>
	]);

	useEffect(()=>{

		const client = new WSClient();

		client.onConnectUpdate = (a)=>setIsConnected(a);

		let logEntries: ReactNode[] = [];

		onWSLog((a: [string,string])=>{
			setLogEntriesR(prevEntries => {
				const newEntries = [
					<div key={Date.now().toString()+Math.random().toString()} className="font-light">
						<span className="font-bold h-full">{`[${a[0]}] `}</span><span className="whitespace-pre-wrap">{a[1]}</span>
						<Separator className="my-1"/>
					</div>,
					...prevEntries
				];
				return newEntries.slice(0,40);
			});
			setWhy(Date.now());
		});

		onWSEvent((l) => {
			const { t, c }: { t: SocketRecvMessageType, c: any } = l;
			if (t === SocketRecvMessageType.NEW_SESSION) {
				setLogEntriesR(prevEntries => {
					const newEntries = [
						<div key={Date.now().toString()+Math.random().toString()} className="font-light">
							<span className="font-bold h-full">{`[SOCKET] `}</span><span className="whitespace-pre-wrap">{`New Session from ${c.game} (${c.placeid}/${c.jobid})`}</span>
							<Separator className="my-1"/>
						</div>,
						...prevEntries
					];
					return newEntries.slice(0,40);
				});
				setWhy(Date.now());
				return;
			};
			if (t === SocketRecvMessageType.USER_MSG) {
				setLogEntriesR(prevEntries => {
					const newEntries = [
						<div key={Date.now().toString()+Math.random().toString()} className="font-light">
							<span className="font-bold">{`${c.discord_name} `}</span><span className="text-muted-foreground">{c.id} - {c.ji}</span><br/>
							<span className="whitespace-pre-wrap">{c.msg}</span>
							<Separator className="my-1"/>
						</div>,
						...prevEntries
					];
					return newEntries.slice(0,40);
				});
				setWhy(Date.now());
				return;
			};
			if (t === SocketRecvMessageType.MESSAGE) {
				setLogEntriesR(prevEntries => {
					const newEntries = [
						<div key={Date.now().toString()+Math.random().toString()} className="font-light">
							<span className="font-bold">{`${c.user} `}</span><span className="text-muted-foreground">{c.id} - {c.ji}</span><br/>
							<span className="whitespace-pre-wrap">{c.msg}</span>
							<Separator className="my-1"/>
						</div>,
						...prevEntries
					];
					return newEntries.slice(0,40);
				});
				setWhy(Date.now());
				return;
			};
		});

		(window as any || global as any).REMUI_SocketManager = {
			connect: () => {
				try {
					window.localStorage.remuiJwt = jwtInputRef.current?.value as string;
					window.localStorage.remuiPds = pdsInputRef.current?.value as string;
				} catch {};
				client.setJwtToken(jwtInputRef.current?.value as string)
				client.setPdsAddr(pdsInputRef.current?.value as string)
				client.connect();
			},
			disconnect: () => {
				client.disconnect();
			},
			clearLog: () => {
				logEntries = [
					<div key="0" className="font-light">
						<span className="font-bold h-full">{"[REMUI] "}</span><span className="whitespace-pre-wrap">{"Log cleared"}</span>
					</div>
				];
				setLogEntriesR(logEntries)
			},
			sendMessageInChat: (a:string) => {
				client.sendMessageInChat(a)
			}
		}

		if (jwtInputRef.current) jwtInputRef.current.defaultValue = window.localStorage.remuiJwt || "";
		if (pdsInputRef.current) pdsInputRef.current.defaultValue = window.localStorage.remuiPds || "https://ocbwoy3.dev";

		return ()=>{
			(window as any || global as any).REMUI_SocketManager = undefined;
			try {
				client.disconnect()
				toast("RemUI Disconnected",{
					description:"You left the RemUI page."
				})
			} catch {};
		}

	},[]);

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
	}, [why]);

	return (
		<>
			<span key="controls" className="px-4 py-4 space-x-2 flex">
				<Input type="password" placeholder="JWT Access Token" ref={jwtInputRef} className="w-[200px]"/>
				<Input placeholder="PDS Hostname/URL" ref={pdsInputRef} className="w-[200px]"/>
				{ !isConnected ? (
					<Button onClick={()=>{
						try {
							(window as any || global as any).REMUI_SocketManager.connect();
						} catch(e_) {
							setInitalConnectionError(true);
							toast("Error",{ description:`${e_}` })
						}
					}}>Connect</Button>
				) : (
					<Button onClick={()=>{
						try {
							(window as any || global as any).REMUI_SocketManager.disconnect();
						} catch(e_) {
							toast("Error",{ description:`${e_}` })
						}
					}}>Disconnect</Button>
				) }
				<Button variant="secondary" onClick={()=>{
					blockRef.current?.requestFullscreen()
				}}>Fullscreen</Button>
				<Button variant="outline" onClick={()=>{
					(window as any || global as any).REMUI_SocketManager.clearLog();
				}}>Clear</Button>
			</span>
			{ initalConnectionError ? (
				<span key="connection_warning" className="px-4">{"Error, maybe try connecting again?"}</span>
			) : (
				<span key="connection_warning" className="px-4">{"I suck at React & Tailwind, so latest is at the top!!!!"}</span>
			)}

			<div key="fullscreen_block" className="px-4 block bg-background text-foreground max-h-96 overflow-hidden" ref={blockRef}>
				<br/>
				<span key="notice" className="mt-6">{`REM - REMOTE ADMIN | `}<span className="underline" onClick={()=>{
					if (isConnected === true) {
						(window as any || global as any).REMUI_SocketManager.disconnect();
					} else {
						(window as any || global as any).REMUI_SocketManager.connect();
					}
				}}>{isConnected ? "" : "DIS"}CONNECTED</span>{` - LATEST ON TOP - FULLSCREEN FOR ENTIRE HISTORY`}</span>
				<Separator className="my-4"/>
				<div className="py-2 overflow-hidden max-h-[100vh] bottom-0">
					<div className="flex flex-col h-5/6" ref={containerRef}>
						{logEntriesR.map(a=>a)}
					</div>
				</div>
				<FloatingChatBar/>
			</div>
		</>
	);
}