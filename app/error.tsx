'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { redirect, useRouter } from 'next/navigation'
import { Metadata } from 'next'
import { toast } from 'sonner'

export const metadata: Metadata = {
	title: "Error"
}

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	const router = useRouter()

	useEffect(() => {
		console.warn("[ocbwoy3.dev] PAGE RENDER ERROR");
		console.warn(error);
		router.push("/");
		toast("Error",{
			description: error.message
		});
	}, [error])

	return (
		<></>
	)
}