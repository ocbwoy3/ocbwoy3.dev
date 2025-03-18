"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { ShopItem, ShopItemProps } from "./ShopItem";

interface Category {
	name: string;
	description: string;
	items: ShopItemProps[];
}

const categories: Category[] = [
	{
		name: "limiteds",
		description: "exclusive items",
		items: [
			/*
			{
				id: "fisch",
				name: "fisch",
				price: "1 gorgillon gold bars",
				image: "https://static-ocbwoy3dev.darktru.win/a-million-billion-dollar-deal-to-buy-fisch.webp",
				description: "real fishing is more fun than this",
			},
			*/
			{
				id: "salt-premium",
				name: "salt premium",
				price: "55€/puff",
				image: "https://static-ocbwoy3dev.darktru.win/salt.png",
				description: "ar apkures garšu",
				link: "https://x.com/skinnysmoker444/status/1575411219699212289"
			},
		],
	},
	{
		name: "other accessories",
		description: "some real bangers",
		items: [
			{
				id: "shirt",
				name: "tshirt xs",
				price: "29.99$",
				image: "https://static-ocbwoy3dev.darktru.win/ts.jpg",
				description: "extra extra smol",
			},
			{
				id: "keychain",
				name: "keychain",
				price: "30$",
				image: "https://static-ocbwoy3dev.darktru.win/keychain.jpg",
				description: "put ur keys on there",
			},
		],
	},
	{
		name: "extras",
		description: "for the lolz",
		items: [
			{
				id: "trump-paper",
				name: "trump paper",
				price: "1$",
				image: "https://static-ocbwoy3dev.darktru.win/fascist-paper.png",
				description: "make your bathroom great again",
			},
			{
				id: "trump-mugshot",
				name: "trump mugshot",
				price: "299.95$",
				image: "https://static-ocbwoy3dev.darktru.win/felon.webp",
				description: "keep this guy in jail",
			},
			{
				id: "fund-website",
				name: "fund my domain",
				price: "20€",
				image: "https://static-ocbwoy3dev.darktru.win/domain.png",
				description: "donations would be appreciated",
			},
		],
	},
	{
		name: "the hunt: mega edition",
		description: "you just got trolled, as it is not possible to sell mega tokens, go grind them yourself instead",
		items: [
			"1st",
			"2nd",
			"3rd",
			"4th",
			"5th",
			"6th",
			"7th",
			"8th",
			"9th",
			"10th",
			"11th",
			"12th",
			"13th",
			"14th",
			"15th",
			"16th",
			"17th",
			"18th",
			"19th",
			"20th",
			"21th",
			"22th",
			"23th",
			"24th",
			"25th",
		].map((a) => ({
			id: `mega-token-${a}`,
			name: `${a} mega token`,
			price: "get",
			image: "https://static-ocbwoy3dev.darktru.win/mega.webp",
			description: `${a} token to a million $$$`,
			link: "https://www.roblox.com/games/124180448122765/The-Hunt-Mega-Edition"
		})),
	},
];

export default function Storefront() {
	const [search, setSearch] = useState("");

	return (
		<div className="min-h-screen py-10">
			<div className="max-w-7xl mx-auto px-4">
				<h1 className="text-7xl font-bold text-center pb-2">
					<span className="text-blue font-bold font-mono">
						ocbwoy3.dev
					</span>{" "}
					<span className="text-green font-mono">store</span>
				</h1>
				<h1 className="text-muted-foreground text-center text-xs mb-4">
					{
						"(obviously a publicity stunt and a joke because of YOU, yes, you asked for it, click on images to view full ver)"
					}
				</h1>

				<input
					type="text"
					placeholder="Search items..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="bg-surface1 placeholder:text-blue w-full p-2 text-text border border-muted-foreground selection:border-blue focus:outline-hidden rounded mb-4"
				/>

				<div className="space-y-8">
					{categories.flatMap((category) =>
						category.items.filter((item) =>
							item.name
								.toLowerCase()
								.includes(search.toLowerCase())
						)
					).length === 0 ? (
						<div className="text-center">
							<h1 className="text-3xl text-blue">
								{"Welp... We couldn't find that."}
							</h1>
							{"Maybe try searching for something else?"}
						</div>
					) : (
						<></>
					)}
					{categories.map((category, key) => {
						const filteredItems = category.items.filter((item) =>
							item.name
								.toLowerCase()
								.includes(search.toLowerCase())
						);
						if (filteredItems.length === 0) return null;

						return (
							<div key={key}>
								<h2 className="text-2xl text-blue font-semibold pt-4">
									{category.name}
								</h2>
								<p className="text-muted-foreground mb-4">
									{category.description}
								</p>

								<div className="flex flex-wrap gap-6 items-start">
									{filteredItems.map((a, b) => (
										<ShopItem key={b} {...a} />
									))}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
