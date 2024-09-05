export type Link = {
	title: string
	url: string
}

export const discordLink = "https://discord.gg/y3xCjzFUDK"; // PrikolsHub

export const defaultLinks: Link[] = [
	{title:"Global Ban Lookup",url:"/lookup"},
	{title:"112 Ban Appeal",url:"/appeal"},
	{title:"Discord",url:discordLink}, // DO NOT TOUCH THIS!!!
	{title:"REM (Remote Admin)",url:"https://github.com/ocbwoy3/rem"},
	{title:"Dotfiles",url:"https://github.com/ocbwoy3/dotfiles"}
]