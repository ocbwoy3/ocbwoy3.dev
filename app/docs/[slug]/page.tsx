export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const { default: Post } = await import(`@/docs/${slug}.mdx`);
	return (
		<div className="overflow-x-hidden px-4 pt-8 font-sans">
			<Post />
		</div>
	);
}
export function generateStaticParams() {
	return [{ slug: "index" }, { slug: "appeal" }];
}
export const dynamicParams = false;
