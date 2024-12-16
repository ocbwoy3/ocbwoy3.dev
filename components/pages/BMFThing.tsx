"use client";

import { useState, useEffect } from "react";
import { BMFView } from "./bmf";
import { Button } from "../ui/button";

export function BMFTHing() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			{isOpen ? (
				<div className="top-0 left-0 w-screen h-screen flex items-center justify-center z-50 text-center bg-black">
					<BMFView />
				</div>
			) : (
				""
			)}
			<Button
				onClick={() => {
					setIsOpen((a) => !a);
				}}
				className="bg-none absolute bottom-2 left-2 z-[60] bg-transparent hover:bg-transparent"
				variant="outline"
			>
				{isOpen ? "Hide" : "Show"} BMF component
			</Button>
		</>
	);
}
