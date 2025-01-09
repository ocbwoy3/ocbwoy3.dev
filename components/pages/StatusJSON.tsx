/* eslint-disable @next/next/no-img-element */
"use client";

import { useStatus } from "@/hooks/use-stat";

interface StatusProps {
	jsonEntry: string;
	defaultValue: any;
}

export function Stat({ jsonEntry, defaultValue }: StatusProps) {
	const stats = useStatus();

	return (
		(stats && (stats as any)[jsonEntry]) ? (stats as any)[jsonEntry] : defaultValue
	);
}
