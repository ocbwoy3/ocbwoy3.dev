"use client";

import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Image from 'next/image'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

type MusicStats = {
	lastUpdated: string,
	year: string,
	link: string,
	timeListened: { hours: number, minutes: number },
	uniqueArtists: number,
	uniqueSongs: number
}

const statsFallback: MusicStats = {
	lastUpdated: "Unknown",
	year: "0000",
	link: "",
	timeListened: { hours: 0, minutes: 0 },
	uniqueArtists: 0,
	uniqueSongs: 0
};

type ShownAlbum =  {
	name: string,
	artist: string,
	hours: number,
	plays: number,
	image: string,
	link: string
}

type ShownGenre = {
	name: string,
	percentage: number
}


type FetchedData = {
	stats: MusicStats,
	albums: ShownAlbum[],
	genres: ShownGenre[]
}

export default function Page() {
	
	const [ stats, setStats ] = useState<MusicStats>(statsFallback)
	const [ albums, setAlbums ] = useState<ShownAlbum[]>([])
	const [ genres, setGenres ] = useState<ShownGenre[]>([])

	useEffect(()=>{
		/*
			console.log(JSON.stringify({
				stats: currentStats,
				albums: albumsTemp,
				genres: genresTemp
			},undefined,"\t"))
		*/
		fetch("https://corsproxy.io?https://cdn.ocbwoy3.dev/music.json").then((d)=>{
			d.json().then((j: FetchedData)=>{
				setStats(j.stats);
				setAlbums(j.albums);
				setGenres(j.genres);
			}).catch((a)=>{
				console.error(a)
				console.warn("CANNOT DECODE JSON REPLAY DATA")
			})
		}).catch((a)=>{
			console.error(a)
			console.warn("CANNOT GET REPLAY DATA")
		})
	})

	return (
		<>
			<div className="h-16"/>
			<p className="w-full font-mono font-bold text-sm text-center">{stats.lastUpdated}</p>
			<p className="w-full font-mono font-bold text-3xl text-center">Replay &apos;{stats.year.match(/..$/)}</p>
			<div className="h-4"/>
			<p className="w-full font-mono font-bold text-muted-foreground text-3xl text-center">{stats.timeListened.hours} hours, {stats.timeListened.minutes} minutes</p>
			<p className="w-full font-mono font-bold text-muted-foreground text-3xl text-center">{stats.uniqueArtists}+ unique artists</p>
			<p className="w-full font-mono font-bold text-muted-foreground text-3xl text-center">{stats.uniqueSongs}+ unique songs</p>
			<div className="h-4"/>
			<p className="w-full font-mono font-bold text-xl text-center">Top Albums</p>
			<ScrollArea className="w-full whitespace-nowrap rounded-md">
				<div className="flex items-center justify-center w-full space-x-4 p-4">
					{albums.map((album) => (
						<Card key={album.name} className="w-[200px]">
							<Link href={album.link}>
								<CardContent className="p-0">
									<img src={album.image} alt={album.name} width={150} height={150} className="w-full h-auto rounded-t-md"/>
									<div className="p-2">
										<p className="font-mono text-base font-bold truncate">{album.name}</p>
										<p className="font-mono text-xs text-muted-foreground">{album.artist}</p>
										<p className="font-mono text-xs">{album.hours} hours</p>
										<p className="font-mono text-xs">{album.plays} Plays</p>
									</div>
								</CardContent>
							</Link>
						</Card>
					))}
				</div>
				<ScrollBar orientation="horizontal" className="invisible"/>
			</ScrollArea>
			<div className="h-4"/>
			<p className="w-full font-mono font-bold text-xl text-center">Top Genres</p>
			<div className="h-4"/>
			<div className="grid place-content-center w-full">
				<div className="space-y-4 w-[300px]">
					{genres.map((genre) => (
						<div key={genre.name} className="space-y-2">
							<div className="flex justify-between items-center">
								<span className="font-mono">{genre.name}</span>
								<span className="font-mono">{genre.percentage}%</span>
							</div>
							<Progress value={genre.percentage}/>
						</div>
					))}
				</div>
			</div>
			<div className="h-8"/>
			<div className="grid place-items-center w-full">
				<Link href={stats.link} className="scale-150">
					<Button variant="outline">The Playlist</Button>
				</Link>
			</div>
			<div className="h-8"/>
		</>
	)
}