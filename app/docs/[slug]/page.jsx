import { MDXProvider } from "@/hooks/use-mdx";

export default async function Page({ params }) {
	const slug = (await params).slug;
	const { default: Post } = await import(`@/docs/${slug}.mdx`);
	return (
		<div className="overflow-x-hidden overflow-y-clip px-4 pt-8 font-sans">
			{/* <MDXProvider> */}
			<Post />
			{/* </MDXProvider> */}
		</div>
	);
}

export async function generateMetadata({ params }) {
	const { slug } = params;
	const { metadata } = await import(`@/docs/${slug}.mdx`);
	return {
		title: metadata.title || "[NO METADATA]",
		description: metadata.description || "@ocbwoy3.dev plz fix!!",
	};
}

export function generateStaticParams() {
	return [{ slug: "intro" }, { slug: "appeal" }, { slug: "announcing-hos" }];
}
export const dynamicParams = false;
