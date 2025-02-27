import { useState, useEffect } from "react";

let currentStatus: any = null;
let subscribers: ((status: any) => void)[] = [];
let intervalId: NodeJS.Timeout | null = null;

const fetchStatus = async () => {
    try {
        const response = await fetch("https://api.ocbwoy3.dev/stats.json");
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
        intervalId = setInterval(fetchStatus, 2000);
    }
};

export function useStatus() {
    const [status, setStatus] = useState<Object>(currentStatus);

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
