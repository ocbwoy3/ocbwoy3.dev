"use client";

// this component was literally ripped from ocbwoy3.dev

import {
	useEffect,
	useRef,
	useState,
	type PropsWithChildren,
	type ReactElement
} from "react";

/* the static-ocbwoy3dev.darktru.win method */
const assets = "https://static-ocbwoy3dev.darktru.win/component/bmf/";

function Draggable({
	children,
	uq,
	index,
	n,
	...props
}: PropsWithChildren & { uq: string; index: number; n: string }) {
	const [position, setPosition] = useState<{ x: number; y: number }>(
		((window || global) as any).ocbwoy3dev_bmf_view[n] || { x: 0, y: 0 }
	);

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const e = ref.current?.getElementsByTagName("img")[0];
		if (!e) return;
		e.ondrag = (d) => {
			const p = document.getElementById(`bmf_view_${uq}`);
			if (!p) return;
			const b: DOMRect = p?.getBoundingClientRect();
			let bruh = {
				x: d.clientX - b.left,
				y: d.clientY - b.top - 64 * index
			};
			((window || global) as any).ocbwoy3dev_bmf_view[n] = bruh;
			setPosition(bruh);
		};
	});

	return (
		<div
			ref={ref}
			className="relative"
			style={{ top: position.y, left: position.x }}
		>
			{children}
		</div>
	);
}

export function BMFView() {
	const uq = "theonlyone"; // DEV ONLY

	const BMF_PRESET_POS: { [n: string]: { x: number; y: number } } = {
		Discord: {
			x: 10,
			y: 10
		},
		Roblox: {
			x: 133,
			y: 214
		},
		Regretevator: {
			x: 244,
			y: 172
		},
		PartyNoob: {
			x: 236,
			y: 33
		},
		Gregoriah: {
			x: 292,
			y: -35
		},
		Linux: {
			x: 312,
			y: -312
		},
		Bluesky: {
			x: 81,
			y: -372
		},
		atproto: {
			x: 9,
			y: -366
		},
		TypeScript: {
			x: 231,
			y: -506
		},
		vscode: {
			x: 296,
			y: -497
		}
	};

	const BMF_PRELOAD_ASSETS: string[] = [
		"Discord",
		"Roblox",
		"Regretevator",
		"PartyNoob",
		"Gregoriah",
		"Linux",
		"Bluesky",
		"atproto",
		"TypeScript",
		"vscode"
	];

	const FW_LIST: string[] = [
		"Roblox",
		"Regretevator",
		"Bluesky / ATProto",
		"TypeScript",
		"Linux"
	];

	const BMF_ALT: { [a: string]: string } = {
		atproto: "AT Protocol",
		vscode: "Visual Studio Code"
	};

	const [BMFElements, setBMFElements] = useState<ReactElement[]>([]);
	const [BMFElementsDev, setBMFElementsDev] = useState<ReactElement[]>([]);
	const [isDeveloper, setIsDeveloper] = useState(
		process.env.NODE_ENV !== "production"
	);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasInternetAccess, setHasInternetAccess] = useState(
		(globalThis as any).bmf_hasInternetAccess !== undefined
			? (globalThis as any).bmf_hasInternetAccess
			: true
	);

	useEffect(() => {
		(async () => {
			try {
				if ((globalThis as any).bmf_hasInternetAccess !== undefined)
					return;
				await fetch(
					assets + BMF_PRELOAD_ASSETS[0].toLowerCase() + ".png"
				);
				(globalThis as any).bmf_hasInternetAccess = true;
			} catch {
				(globalThis as any).bmf_hasInternetAccess = false;
				setHasInternetAccess(false);
			}
		})();

		if (!((window || global) as any).ocbwoy3dev_bmf_view)
			((window || global) as any).ocbwoy3dev_bmf_view = {};
		let elements: ReactElement[] = [];
		let elementsDev: ReactElement[] = [];
		BMF_PRELOAD_ASSETS.forEach((n, index) => {
			((window || global) as any).ocbwoy3dev_bmf_view[n] = BMF_PRESET_POS[
				n
			] || { x: 0, y: 0 };
			elementsDev.push(
				<Draggable key={index + n} uq={uq} index={index} n={n}>
					<img
						id="draggable"
						className="h-16 z-50 flex-none"
						src={assets + n.toLowerCase() + ".png"}
						alt={BMF_ALT[n.toLowerCase()] || n}
					/>
				</Draggable>
			);
			elements.push(
				<div
					key={index + n}
					className="relative"
					style={{
						left: ((window || global) as any).ocbwoy3dev_bmf_view[n]
							.x,
						top: ((window || global) as any).ocbwoy3dev_bmf_view[n]
							.y
					}}
				>
					<img
						className="h-16 z-50 flex-none"
						src={assets + n.toLowerCase() + ".png"}
						alt={BMF_ALT[n.toLowerCase()] || n}
					/>
				</div>
			);
		});
		setBMFElements(elements);
		setBMFElementsDev(elementsDev);
		setIsLoaded(true);
	}, []);

	return (
		<div suppressHydrationWarning>
			<a
				className="text-xl font-bold text-center underline decoration-dotted decoration-foreground"
				href="https://en.wiktionary.org/wiki/moot#Etymology_5"
			>
				{"bmf?"}
			</a>
			<div className="h-2" />
			{/* css is too difficult i wanna make my bmf component look like the ones in tiktok slideshows */}
			<div
				className={
					"w-96 h-96 z-50 grid place-items-start border border-muted rounded-md" +
					(isDeveloper ? "" : " overflow-hidden")
				}
			>
				{hasInternetAccess ? (
					<>
						{isLoaded ? (
							<div
								key="bmfviewreal"
								id={`bmf_view_${uq}`}
								className=""
							>
								{isDeveloper
									? BMFElementsDev.map((a) => a)
									: BMFElements.map((a) => a)}
							</div>
						) : (
							"Loading..."
						)}
					</>
				) : (
					<div
						key="bmfviewreal"
						id={`bmf_view_${uq}`}
						className="top-2 left-2 font-sans text-left pl-2 pt-2"
					>
						<a
							href="https://bsky.app/profile/did:plc:s7cesz7cr6ybltaryy4meb6y/post/3lilpfhrfo22b"
							className="font-bold text-red text-sm"
						>
							{"no more r2 blame cloudflare plz 💔"}
						</a>
						<br />
						<span className="font-bold text-green text-sm">
							{"I fw:"}
						</span>
						<br />
						{FW_LIST.map((e, i) => (
							<span key={i}>
								{e}
								<br />
							</span>
						))}
					</div>
				)}
			</div>

			{isDeveloper ? (
				<>
					<div className="h-1" />
					<div className="space-x-1">
						<button
							onClick={() => {
								const j = JSON.stringify(
									((window || global) as any)
										.ocbwoy3dev_bmf_view,
									undefined,
									"\t"
								);
								window.navigator.clipboard.writeText(j);
							}}
						>
							Copy JSON
						</button>
						<button
							onClick={() => {
								console.log(
									((window || global) as any)
										.ocbwoy3dev_bmf_view
								);
							}}
						>
							Log Positions
						</button>
						<button
							onClick={() => {
								setIsDeveloper(false);
							}}
						>
							Exit
						</button>
					</div>
					<div className="h-2" />
				</>
			) : (
				<>
					<div className="h-1" />
					<span
						onClick={() => setIsDeveloper(true)}
						className="text-sm text-muted-foreground"
					>
					</span>
				</>
			)}
		</div>
	);
}
