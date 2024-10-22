import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "404 Not Found"
}

export default function Error() {

	return (
		<>
			<div className="h-16"/>
			<p className="w-full font-bold text-2xl text-center">{"Not Found!"}</p>
			<p className="w-full font-bold text-sm text-center">{"I don't know what to put here!"}</p>
		</>
	)

}