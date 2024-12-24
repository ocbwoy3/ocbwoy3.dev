"use client";

import { PropsWithChildren } from "react";

export function ClientsidedRender({ children }: PropsWithChildren) {
	return <>
		{children}
	</>
}