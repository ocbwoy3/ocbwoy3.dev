"use client";
import { Post } from "bsky-react-post";

export function BlueskyPost({ did, id }: {did: string, id: string}) {
	return (
		<Post did={did} id={id} />
	);
}