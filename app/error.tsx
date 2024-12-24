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
		toast("Error",{
			description: error.message
		});
	}, [error])

	return (
		<>
			<div>{`Page render error (Next.js ${process.env.NEXT_VERSION!}, ${process.env.NODE_ENV})`}</div>
			<div>{`ocbwoy3.dev ${process.env.NEXT_PUBLIC_GIT_BRANCH!} @ ${process.env.NEXT_PUBLIC_GIT_COMMIT_HASH!.slice(0,6)}`}</div>
			<div className='break-all text-sm'>
				{`${error}`}
			</div>
		</>
	)
}