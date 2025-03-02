/* eslint-disable @next/next/no-img-element */
"use client";

import { Activity, useStatus } from "@/hooks/use-discord-presence";

interface StatusProps {
	allowedApplicationIds?: string[];
	disallowNullApps?: boolean;
}

export function Status({
	allowedApplicationIds = [],
	disallowNullApps = true,
}: StatusProps) {
	const status = useStatus();

	let predicate = (a: Activity) => {
		if (disallowNullApps === true && !a.applicationId) return false;
		if (allowedApplicationIds.length == 0) return true;
		return allowedApplicationIds.includes(`${a.applicationId}`)
			? true
			: false;
	};

	return (
		<div className="font-bold text-center">
			{(status || { activities: [] }).activities.length === 0 ? (
				""
			) : (
				<>
					{(() => {
						if (!status) return <></>;
						const s = status.activities.filter((a) =>
							predicate(a)
						)[0];
						if (!s) return <></>;
						return (
							<>
								<div className="text-text z-[100] w-96 p-2 rounded-lg bg-base text-left flex space-x-2">
									<div className="w-24 static">
										<img
											src={s.assets?.largeImage?.replace(
												"mp:external",
												"https://media.discordapp.net/external"
											)}
											className="rounded-md"
											alt={s.assets?.largeText}
										/>
									</div>
									<div className="w-full overflow-hidden whitespace-nowrap">
										<div className="text-xs">
											<span className="text-xs text-blue">
												{s.name}
											</span>
											<br />
											{s.details}
											<br />
											{s.state}
										</div>
										<div className="text-blue text-sm font-mono">
											{s.timestamps?.start &&
											s.timestamps?.end ? (
												(() => {
													if (!s.timestamps)
														return <></>;
													if (!s.timestamps.start)
														return <></>;
													if (!s.timestamps.end)
														return <></>;
													const progress =
														((Date.now() -
															Number(
																s.timestamps
																	.start
															)) /
															(Number(
																s.timestamps.end
															) -
																Number(
																	s.timestamps
																		.start
																))) *
														100;
													return (
														<div className="w-full bg-mantle rounded-full h-1">
															<div
																className="bg-blue h-1 rounded-full"
																style={{
																	width: `${progress}%`,
																}}
															></div>
														</div>
													);
												})()
											) : (
												<></>
											)}
										</div>
									</div>
								</div>
							</>
						);
					})()}
				</>
			)}
		</div>
	);
}
