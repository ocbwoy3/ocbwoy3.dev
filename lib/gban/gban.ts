import { RobloxUser, getUserIdFromName, getUserInformation } from "./roblox"

export interface BanEntry {
	banProvider: string
	moderator?: string | undefined,
	reason?: string,
	bannedUntil?: number | undefined,
	permBan?: boolean | undefined,
	crashBan?: boolean | undefined,
	banProviderIcon: string,
	isLegacy112Ban?: boolean
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
export async function getTGPBan(userid: string): Promise<BanEntry | null> {
	const rawdata = await fetch(`https://thegoober.xyz/bans/${userid}`,{cache: "no-store"});
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
	Expiry: string,
	ModeratorID: number,
	Scope: "All" | "OCbwoy3sMultiverse" | "SB"
}

// 112-SB
export async function get112Ban(userid: string): Promise<BanEntry | null> {
	const rawdata = await fetch("https://api.ocbwoy3.dev/banland.json",{cache: "no-store"});
	const data: BanData<sb112> = await rawdata.json();

	if (data[userid.toString()]) {
		const ud: sb112 = data[userid.toString()]
		let d: BanEntry = {
			banProvider: "112",
			moderator: ud.Moderator,
			reason: ud.Reason,
			bannedUntil: parseInt(ud.Expiry),
			permBan: (parseInt(ud.Expiry) === 0),
			banProviderIcon: "/ban_handlers/112.webp",
			isLegacy112Ban: (ud.Moderator === "112-SB")
		};
		// console.warn("HOLY SHIT EXPIRY",ud)
		if (ud.Expiry === "-1") {
			d.permBan = true;
		}
		if (ud.Scope !== "All") {
			if (ud.Scope === "OCbwoy3sMultiverse") {
				d.banProvider = "OCbwoy3's Multiverse";
				d.banProviderIcon = "/ban_handlers/ocbwoy3smultiverse.webp";
			};
			if (ud.Scope === "SB") {
				d.banProvider = "112 - SB";
			};
		}
		return d;
	}
	return null;
}

type nexusLike = {
	plr: string,
	reason: string
}

// Karma
export async function getKarmaBan(userid: string): Promise<BanEntry | null> {
	const rawdata = await fetch("https://corsproxy.io?https://karma.ocbwoy3.dev/bans",{cache: "no-store"});
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
	bans: BanEntry[],
	userDescription: string
}

export async function getBanInformation(userName: string): Promise<BanReturns | null> {
	const userid: number | null = await getUserIdFromName(userName);
	if (!userid) return null;
	const userdata: RobloxUser = await getUserInformation(userid);

	let banProviderData: BanEntry[] = [];
	
	try {
		let sb112 = await get112Ban(userid.toString()); if (sb112) { banProviderData.push(sb112) };
	} catch { }
	try {
		let karma = await getKarmaBan(userid.toString()); if (karma) { banProviderData.push(karma) };
	} catch { }
	try {
		let tgp = await getTGPBan(userid.toString()); if (tgp) { banProviderData.push(tgp) };
	} catch { }
	

	let retval: BanReturns = {
		username: userdata.UserName,
		displayName: userdata.DisplayName,
		profilePicture: userdata.AvatarImageUrl,
		userId: userdata.UserId,
		bans: banProviderData,
		userDescription: (userdata.Description || "No Description...").trim().slice(0,128).trim()
	};

	return retval;
}