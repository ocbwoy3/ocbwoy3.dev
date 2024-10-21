"use client";

import React, { useEffect } from "react";

export function PageLoadHandler() {

	useEffect(()=>{
		console.log(Date.now());
	},[])

	return (
		<></>
	);
}