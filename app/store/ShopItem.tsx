import { useState } from "react";
import { toast } from "sonner";

/* eslint-disable @next/next/no-img-element */
export interface ShopItemProps {
	id: number | string;
	name: string;
	price: string;
	image: string;
	description: string;
	link?: string;
}

export function ShopItem({ id, name, price, image, description, link }: ShopItemProps) {
	const [didPress, setDidPress] = useState<boolean>(false);
	return (
		<div className="rounded-md outline outline-2 outline-offset-8 outline-blue p-4 font-mono flex flex-col items-center">
			<div className="text-xl text-blue font-bold text-center">{name}</div>
			<div className="text-xs text-muted-foreground text-center mb-2">{description}</div>
			<img src={image} alt={"Image failed to load, LOL! Anyways, click here to see the full version of it."} onClick={()=>{
				open(image)
			}} className="w-64 rounded-lg mb-4 hover:cursor-zoom-in" />
			<button
				onClick={() => {
					if (!link) {
						toast(`nuh uh!!!`, {
							description: "this page is obviously a joke, ignore!!!",
						});
						setDidPress(true);
					} else {
							open(link);
					}
				}}
				className={`rounded-md outline outline-2 hover:outline-4 outline-offset-8 p-2 outline-${didPress ? 'red' : 'green'} text-${didPress ? 'red' : 'green'} font-mono text-xl w-full`}
			>
				{price}
			</button>
		</div>
	);
}
