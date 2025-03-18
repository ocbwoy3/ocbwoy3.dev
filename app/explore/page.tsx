import Content from "./content.mdx";

export const metadata = {
	title: "Guide",
	description: "Come explore ocbwoy3.dev with me!"
};

export default function Page() {
	return (
		<div className="overflow-x-hidden overflow-y-clip px-32 py-8 font-sans" suppressHydrationWarning>
			<Content/>
		</div>
	);
}