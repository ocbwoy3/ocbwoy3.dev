import { Metadata } from "next";
import Head from "next/head";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const { default: Post, metadata } = await import(`@/docs/${slug}.mdx`);

	const meta: Metadata = metadata || {};

	// console.log(meta)

	return (
		<main suppressHydrationWarning>
			<Head>
				<title>{(meta.title as string) || "page"}</title>
			</Head>
			<Post />
		</main>
	);
}

export function generateStaticParams() {
	return [{ slug: "hello" }, { slug: "appeal" }];
}

export const dynamicParams = false;
