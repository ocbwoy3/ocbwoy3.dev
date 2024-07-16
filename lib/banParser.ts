import { RobloxUser, getUserIdFromName, getUserInformation } from "./roblox"

export interface BanEntry {
	banProvider: string
	moderator?: string|undefined,
	reason?: string,
	bannedUntil?: number|undefined,
	permBan?: boolean|undefined,
	crashBan?: boolean|undefined,
	banProviderIcon: string
}

export interface BanData<T> {
	[userid: string]: T
}

type theGooberProject = {
	UserId: number,
	Expiry: number,
	Reason: string,
	PermBan: boolean,
	CrashBan: boolean,
	Moderator: string
}

// The Goober Project
export async function getTGPBan(userid:string): Promise<BanEntry|null> {
	const rawdata = await fetch("https://corsproxy.io?https://cndfker.doqe.dev/bans");
	const data: BanData<theGooberProject> = await rawdata.json();

	if (data[userid.toString()]) {
		const ud: theGooberProject = data[userid.toString()]
		let d: BanEntry = {
			banProvider: "The Goober Project",
			moderator: "?",
			reason: ud.Reason,
			bannedUntil: ud.Expiry,
			permBan: ud.PermBan,
			crashBan: ud.CrashBan,
			banProviderIcon: "/ban_handlers/thegooberproject.webp"
		};
		return d;
	}
	return null;
}

type sb112 = {
	Reason: string,
	Moderator: string,
	Expiry: number,
	ModeratorID: number
}

// 112-SB / PrikolsHub
export async function get112Ban(userid:string): Promise<BanEntry|null> {
	const rawdata = await fetch("https://corsproxy.io?https://api.ocbwoy3.dev/.prikolshub/banland.json");
	const data: BanData<sb112> = await rawdata.json();

	if (data[userid.toString()]) {
		const ud: sb112 = data[userid.toString()]
		let d: BanEntry = {
			banProvider: "112 (PrikolsHub)",
			moderator: ud.Moderator,
			reason: ud.Reason,
			bannedUntil: ud.Expiry,
			permBan: (ud.Expiry === 0),
			banProviderIcon: "/ban_handlers/112.webp"
		};
		return d;
	}
	return null;
}

type nexusLike = {
	plr: string,
	reason: string
}

// Nova
export async function getNovaBan(userid:string): Promise<BanEntry|null> {
	const rawdata = await fetch("https://corsproxy.io?https://api.scriptlang.com/bans");
	const data: BanData<nexusLike> = await rawdata.json();

	if (data[userid.toString()]) {
		const ud: nexusLike = data[userid.toString()]
		let d: BanEntry = {
			banProvider: "Nova",
			moderator: "Unknown",
			reason: ud.reason,
			bannedUntil: 0,
			permBan: true,
			banProviderIcon: "/ban_handlers/nova.webp"
		};
		return d;
	}
	return null;
}


// Karma
export async function getKarmaBan(userid:string): Promise<BanEntry|null> {
	const rawdata = await fetch("https://corsproxy.io?https://karma.doqe.dev/bans");
	const data: BanData<nexusLike> = await rawdata.json();

	if (data[userid.toString()]) {
		const ud: nexusLike = data[userid.toString()]
		let d: BanEntry = {
			banProvider: "Karma",
			moderator: "Unknown",
			reason: ud.reason,
			bannedUntil: 0,
			permBan: true,
			banProviderIcon: "/ban_handlers/karma.webp"
		};
		return d;
	}
	return null;
}

// BAN PARSER

export type BanReturns = {
	username: string,
	profilePicture: string,
	displayName: string,
	userId: number,
	bans: BanEntry[]
}

export async function getBanInformation(userName:string): Promise<BanReturns|null> {
	const userid: number|null = await getUserIdFromName(userName);
	if (!userid) return null;
	const userdata: RobloxUser = await getUserInformation(userid);

	let banProviderData: BanEntry[] = [];
	try {
		let tgp = await getTGPBan(userid.toString()); if (tgp) { banProviderData.push(tgp) };
	} catch {}
	try {
		let sb112 = await get112Ban(userid.toString()); if (sb112) { banProviderData.push(sb112) };
	} catch {}
	try {
		let karma = await getKarmaBan(userid.toString()); if (karma) { banProviderData.push(karma) };
	} catch {}
	try {
		let nova = await getNovaBan(userid.toString()); if (nova) { banProviderData.push(nova) };
	} catch {}
	
	
	const retval: BanReturns = {
		username: userdata.UserName,
		displayName: userdata.DisplayName,
		profilePicture: userdata.AvatarImageUrl,
		userId: userdata.UserId,
		bans: banProviderData
	};

	return retval;
}