"use client";
import { useState, useEffect } from "react";

type AgeProps = {
	birthday: string; // ISO 8601 date string (YYYY-MM-DD)
};

export function RealHumanAge({ birthday }: AgeProps) {
	const calculateAge = () => {
		const birthDate = new Date(birthday);
		const now = new Date();
		const age = now.getFullYear() - birthDate.getFullYear();

		// Check if birthday hasn't occurred yet this year
		if (
			now.getMonth() < birthDate.getMonth() ||
			(now.getMonth() === birthDate.getMonth() &&
				now.getDate() < birthDate.getDate())
		) {
			return age - 1;
		}
		return age;
	};

	const [age, setAge] = useState(calculateAge());

	useEffect(() => {
		const interval = setInterval(() => {
			setAge(calculateAge());
		}, 1000); // Update every second

		return () => clearInterval(interval);
	}, []);

	return `${age || "??"}`
}
