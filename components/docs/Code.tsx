import { codeToHtml } from "shiki";
import type { BundledLanguage, BundledTheme } from "shiki"; // Import the types from shiki // [!code highlight]

type Props = {
	code: string;
	lang?: BundledLanguage;
	theme?: BundledTheme;
};

export async function Codeblock({
	code,
	lang = "luau"
}: Props) {
	const html = await codeToHtml(code, {
		lang,
		theme: "catppuccin-mocha",
	});

	return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }}></div>;
}
