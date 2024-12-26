import SyntaxHighlighter from "react-syntax-highlighter";
import mocha from "react-syntax-highlighter-catppuccin/mocha";
import { ReactNode } from "react";
import Link from "next/link";

export function useMDXComponents(components: { children: ReactNode }) {
	return {
		...components,
		a: ({ children, href }: { children: ReactNode, href: string }) => (
			<Link href={href} className="underline">
				{children}
			</Link>
		),
		checkbox: () => (
			"check box"
		),
		ul: ({ children }: { children: ReactNode }) => (
			<ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
				{children}
			</ul>
		),
		ol: ({ children }: { children: ReactNode }) => (
			<ol style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
				{children}
			</ol>
		),
		li: ({ children }: { children: ReactNode }) => (
			<li style={{ marginBottom: "8px" }}>{children}</li>
		),
		input: ({ type, ...props }: { type: "checkbox" }) => {
			if (type === "checkbox") {
				return (
					<input
						type="checkbox"
						style={{ marginRight: "8px" }}
						{...props}
					/>
				);
			}
			return <input type={type} {...props} />;
		},
		code: ({
			className,
			children,
		}: {
			className: string;
			children: ReactNode;
		}) => {
			const language = className?.replace("language-", "") || "";
			return (
				<span className="my-4 rounded-lg overflow-hidden">
					{/* <SyntaxHighlighter language={language} style={mocha}> */}
						{String(children).trim()}
					{/* </SyntaxHighlighter> */}
				</span>
			);
		},
		blockquote: ({ children }: { children: ReactNode }) => (
			<span className="pl-4 pr-4 bg-mantle text-text">{children}</span>
		),
	};
}
