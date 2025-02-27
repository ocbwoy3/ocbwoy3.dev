import { Suspense } from "react";
import { fetchFormDetails } from "./api"; // Adjust the import path as needed
import type { Metadata, ResolvingMetadata } from "next";
import type React from "react"; // Added import for React

type Props = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const formData = await fetchFormDetails((await params).id);
	return {
		title: formData.name,
		description: formData.description,
	};
}

export default async function FormLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	const formData = await fetchFormDetails(params.id);

	return (
		<div className="max-w-4xl mx-auto p-4">
			<title>{formData.name}</title>
			<h1 className="text-2xl font-bold mb-4">{formData.name}</h1>
			{formData.description && (
				<p className="text-gray-600 mb-6">{formData.description}</p>
			)}
			<Suspense fallback={<div>Loading form content...</div>}>
				{JSON.stringify(formData)}
				{children}
			</Suspense>
		</div>
	);
}
