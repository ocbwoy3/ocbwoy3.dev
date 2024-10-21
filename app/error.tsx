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

	const [isWarned, setIsWarned] = useState<boolean>(false) 

	useEffect(() => {
		if (isWarned) return;
		setIsWarned(true);
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