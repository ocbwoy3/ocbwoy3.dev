"use client";

import { useState, useEffect } from "react";

let currentStatus: any = {};
let subscribers: ((status: any) => void)[] = [];
let intervalId: NodeJS.Timeout | null = null;

export type Ban = {
	Reason: string,
	Moderator: string
}

const fetchStatus = async () => {
    try {
        const response = await fetch("https://api.ocbwoy3.dev/banland.json");
        const data = await response.json();
        currentStatus = data;
        subscribers.forEach((callback) => callback(currentStatus));
    } catch (error) {
        currentStatus = null;
        subscribers.forEach((callback) => callback(null));
        // console.error("Failed to fetch status:", error);
    }
};

const startFetching = () => {
    if (!intervalId) {
        fetchStatus(); // Initial fetch
        intervalId = setInterval(fetchStatus, 10000); // Fetch every 10 seconds
    }
};

export function use112Bans() {
    const [status, setStatus] = useState<{[id: string]: Ban}>(currentStatus);

    useEffect(() => {
        subscribers.push(setStatus);
        startFetching();

        return () => {
            subscribers = subscribers.filter((callback) => callback !== setStatus);
            if (subscribers.length === 0 && intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };
    }, []);

    return status;
}
