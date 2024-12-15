"use client";

import { useState, useEffect } from "react";
import { BMFView } from "./bmf";

export function ScrollBMF() {
	const [isScrollingDown, setIsScrollingDown] = useState(false);

	useEffect(() => {
		let lastScrollY = window.pageYOffset;
		let ticking = false;

		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const currentScrollY = window.pageYOffset;
					if (currentScrollY > lastScrollY) {
						setIsScrollingDown(true);
					} else {
						setIsScrollingDown(false);
					}
					lastScrollY = currentScrollY;
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-32 flex justify-center items-center z-30 transition-opacity duration-300 ease-in-out ${
				isScrollingDown
					? "opacity-100"
					: "opacity-0 pointer-events-none"
			}`}
		>
			<BMFView />
		</div>
	);
}
