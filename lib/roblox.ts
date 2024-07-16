/* Stolen from https://github.com/ocbwoy3/nexus/blob/master/src/lib/roblox.ts */

export type RobloxGroup = {
	GroupId: number,
	Name: string
	Rank: number,
	RoleName: string
}

export type RobloxUser = {
	UserId: number,
	UserName: string,
	DisplayName: string,
	HasVerifiedBadge: boolean,

	Description: string,
	Created: string,
	IsBanned: boolean,

	AvatarImageUrl: string
	isDummyData?: boolean

	PrimaryGroup?: RobloxGroup | null
}


export type RobloxUserAPIData = {
	description: string,
	created: string,
	isBanned: boolean,
	externalAppDisplayName: any,
	hasVerifiedBadge: boolean,
	id: number,
	name: string,
	displayName: string
}

export type RobloxGroupData = {
	group: {
		id: number,
		name: string,
		description: string,
		owner: {
			hasVerifiedBadge: boolean,
			userId: number,
			username: string,
			displayName: string
		},
		shout: string | null,
		memberCount: number,
		isBuildersClubOnly: boolean,
		publicEntryAllowed: boolean,
		hasVerifiedBadge: boolean
	},
	role: {
		id: number,
		name: string,
		rank: number
	},
	isPrimaryGroup?: boolean | null
}

export type RobloxUsernameAPIData = {
	data: [
		{
			requestedUsername: string,
			hasVerifiedBadge: boolean,
			id: number,
			name: string,
			displayName: string
		}
	]
}

export type RobloxGroupAPIData = {
	data: [
		RobloxGroupData
	]
}

export type RobloxThumbnailAPIData = {
	data: [
		{
			targetId: number,
			state: string,
			imageUrl: string,
			version: string
		}
	]
}

export const DummyGroupInfo: RobloxGroup = {
	GroupId: 1,
	Name: "PrikolsHub",
	Rank: 1,
	RoleName: "Member"
}

export const DummyUserInfo: RobloxUser = {
	UserId: 1,
	UserName: "Loading...",
	DisplayName: "Loading...",
	HasVerifiedBadge: true,

	Description: "Loading...",
	Created: "2283-01-01T00:00:00.000Z",
	IsBanned: false,

	AvatarImageUrl: "https://secload.scriptlang.com/static/uu.gif",
	isDummyData: true,

	PrimaryGroup: null // DummyGroupInfo
}

function delay(ms: number) {
	return new Promise( resolve => setTimeout(resolve, ms) );
}

export async function getUserIdFromName(name:string): Promise<number|null> {
	let __user = await fetch(`https://corsproxy.io/?https://users.roblox.com/v1/usernames/users`,{
		method: "POST",
		cache: "no-store",
		body: JSON.stringify({
			usernames: [name],
			excludeBannedUsers: false
		})
	})
	let username: RobloxUsernameAPIData = (await __user.json())
	if (username.data.length !== 1) {
		return null;
	} else {
		return username.data[0].id;
	}
}

export function formatJoinDate(iso8061DateString: string): string {
	const thenDate = new Date(iso8061DateString);
	const nowDate = new Date();
	const diffMs = Math.abs(nowDate.getTime() - thenDate.getTime());
	const diffSecs = Math.floor(diffMs / 1000);
	const diffMins = Math.floor(diffSecs / 60);
	const diffHours = Math.floor(diffMins / 60);
	const diffDays = Math.floor(diffHours / 24);
	const diffMonths = Math.floor(diffDays / 30);
	const diffYears = Math.floor(diffMonths / 12);

	const remainingMonths = diffMonths % 12;
	const remainingDays = diffDays % 30;

	if (diffHours === 0) {
		return "Joined less than an hour ago."
	}

	if (diffHours === 1) {
		return "Joined an hour ago."
	}

	if (diffHours < 24) {
		return `Joined ${diffHours} hours ago.`;
	} else if (diffDays < 30) {
		return `Joined ${diffDays} day${diffDays !== 1 ? "s" : ""} ago.`;
	} else if (diffMonths < 2) {
		return `Joined a month and ${remainingDays} day${remainingDays !== 1 ? "s" : ""} ago.`;
	} else if (diffYears == 0) {
		if (diffDays == 0) {
			return `Joined ${diffMonths} months ago.`
		} else {
			return `Joined ${diffMonths} months and ${diffDays} day${remainingDays !== 1 ? "s" : ""} ago.`;
		}
	} else if (diffYears == 1) {
		if (diffMonths == 0) {
			return `Joined a year ago.`
		} else {
			return `Joined a year and ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""} ago.`;
		}
	} else {
		if (remainingMonths == 0) {
			return `Joined ${diffYears} years ago.`
		} else {
			return `Joined ${diffYears} years and ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""} ago.`;
		}
	}
}

export async function getUserPrimaryGroup(userId:number): Promise<RobloxGroup|null> {
	let __groups = await fetch(`https://corsproxy.io/?https://groups.roblox.com/v1/users/${userId.toString()}/groups/roles?includeLocked=false`,{cache: "no-store"})
	let groups: RobloxGroupData[] = (await __groups.json()).data

	for (var i in groups) {
		let group = groups[i]
		if (group.isPrimaryGroup) {
			let retval: RobloxGroup = {
				GroupId: group.group.id,
				Name: group.group.name,
				Rank: group.role.rank,
				RoleName: group.role.name	
			}
			return retval
		}

	}

	return null
}

export async function getUserInformation(userId:number): Promise<RobloxUser> {
	let __userInfo = await fetch(`https://corsproxy.io/?https://users.roblox.com/v1/users/${userId.toString()}`,{cache: "no-store"})
	let userInfo: RobloxUserAPIData = (await __userInfo.json())

	let __userThumb = await fetch(`https://corsproxy.io/?https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId.toString()}&size=720x720&format=Png&isCircular=false`,{cache: "no-store"})
	let userThumbJ = (await __userThumb.json())
	let userThumb = userThumbJ.data[0].imageUrl

	//await delay(2000)

	let retval: RobloxUser = {
		UserId: userInfo.id,
		UserName: userInfo.name,
		DisplayName: userInfo.displayName,
		HasVerifiedBadge: userInfo.hasVerifiedBadge,

		Description: userInfo.description,
		Created: userInfo.created,
		IsBanned: userInfo.isBanned,

		AvatarImageUrl: userThumb,
		PrimaryGroup: (await getUserPrimaryGroup(userId)),

		isDummyData: false
	}

	return retval
}