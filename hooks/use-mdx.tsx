"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface MDXContextType {
	// Add any context properties you need
}

const MDXContext = createContext<MDXContextType | undefined>(undefined);

export function MDXProvider({ children }: { children: ReactNode }) {
	const contextValue = {
		// Add any context values you need
	};

	return (
		<MDXContext.Provider value={contextValue}>
			{children}
		</MDXContext.Provider>
	);
}

export function useMDXContext() {
	const context = useContext(MDXContext);
	if (context === undefined) {
		throw new Error("useMDXContext must be used within a MDXProvider");
	}
	return context;
}
