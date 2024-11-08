import { useState } from "react";
import { EmitWSEvent, REMGlobalEventsWS, SocketSendMessageType, wsLog } from "./WSEvent";
import assert from "assert";
import { EventEmitter } from "stream";

export class WSClient {
	public sock?: WebSocket;
	public socketAddr: string = "";
	
	public _isConnected: boolean = false;
	public onConnectUpdate = (x:boolean)=>{}
	private jwtToken: string = "";

	private _events: ((...a: any)=>any)[] = [];

	constructor() {}

	public setPdsAddr(pdsAddr: string) {
		const isValid = (pdsAddr.startsWith("http://") || pdsAddr.startsWith("https://"))
		const isHttps = pdsAddr.startsWith("https://")
	
		if (!isValid) throw "WSClientError: PDS Address must start with http:// or https://"
		this.socketAddr = (isHttps ? "wss://" : "ws://") + pdsAddr.replace(/^https?:\/\//,"").replace(/\/$/,"") + "/remui/socket" + (this.jwtToken.length > 0 ? `?jwt=${this.jwtToken}` : "")
	}

	public setJwtToken(jwt: string) {
		this.jwtToken = jwt;
	}

	public async connect() {
		if (this._isConnected === true) throw "WSClientError: Already connected";
		this._isConnected = true;
		this.onConnectUpdate(true);
		
		wsLog(`Connecting to RemUI socket at ${this.socketAddr.replace("?jwt="+this.jwtToken,"")}`)
		this.sock = new WebSocket(this.socketAddr)
		
		this.sock.onmessage = (ev:MessageEvent) => {
			try {
				const jd = JSON.parse(ev.data);
				assert(typeof jd.t === "number");
				assert(typeof jd.c === "object");
				REMGlobalEventsWS.emit("recv",jd);
			} catch {};
		}

		this.sock.onclose = (ev:CloseEvent) => {
			console.warn("[REMUI] WS CLOSE:",ev);
			wsLog(`Disconnected (${ev.code}) - ${ev.reason.length > 0 ? ev.reason : "Unknown"}`);
			this._isConnected = false;
			this.onConnectUpdate(false);
		}

		this.sock.onerror = (ev:Event) => {
			console.warn("[REMUI] WS ERROR:",ev);
			this._isConnected = false;
			this.onConnectUpdate(false);
		}

		const doit = () => {
			const e = (a: any)=>{
				this.sock?.send(JSON.stringify(a))
			}
			REMGlobalEventsWS.on("send",e)
			this._events.push(e);
			EmitWSEvent(0,undefined as any);
			setTimeout(() => {
				try {
					EmitWSEvent(0,undefined as any);
				} catch {};
			}, 500);
		}

		this.sock.onopen = ()=>{
			wsLog(`Connected to socket, sending ack signal.`);
			doit()
		}
		
	}

	public disconnect() {
		if (this._isConnected === false) throw "WSClientError: Not connected";
		try { this.sock?.close(); } catch {};
		this._events.forEach(e=>{
			REMGlobalEventsWS.removeListener("send",e);
		})
		this._events = [];
	}

	public sendMessageInChat(content: string) {
		console.log(content);
		const lexiconLink = this.socketAddr.replace(/^ws(s)?/,"http$1").replace("/remui/socket","/xrpc/app.rem.chat.sendMessage")
		fetch(lexiconLink,{
			method: "POST",
			headers: {
				Authorization: this.jwtToken
			},
			body: content.slice(0,500)
		}).catch(e=>{});
	}

}