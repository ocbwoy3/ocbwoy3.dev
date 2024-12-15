"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface BouncingImageProps {
	src: string;
	alt: string;
}

export default function BouncingImage({ src, alt }: BouncingImageProps) {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [direction, setDirection] = useState({ x: 1, y: 1 });
	const imageRef = useRef<HTMLImageElement>(null);
	const [imageDimensions, setImageDimensions] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const image = imageRef.current;
		if (image) {
			const updateDimensions = () => {
				setImageDimensions({
					width: image.naturalWidth,
					height: image.naturalHeight,
				});
			};
			image.addEventListener("load", updateDimensions);
			return () => image.removeEventListener("load", updateDimensions);
		}
	}, []);

	useEffect(() => {
		let animationFrameId: number;

		const animate = () => {
			setPosition((prevPosition) => {
				const newPosition = {
					x: prevPosition.x + direction.x,
					y: prevPosition.y + direction.y,
				};

				const newDirection = { ...direction };

				if (
					newPosition.x <= 0 ||
					newPosition.x + imageDimensions.width >= window.innerWidth
				) {
					newDirection.x *= -1;
				}
				if (
					newPosition.y <= 0 ||
					newPosition.y + imageDimensions.height >= window.innerHeight
				) {
					newDirection.y *= -1;
				}

				setDirection(newDirection);

				return newPosition;
			});

			animationFrameId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	}, [direction, imageDimensions]);

	return (
		<div className="fixed inset-0 overflow-hidden">
			<Image
				ref={imageRef}
				src={src}
				alt={alt}
				width={imageDimensions.width}
				height={imageDimensions.height}
				style={{
					position: "absolute",
					left: `${position.x}px`,
					top: `${position.y}px`,
				}}
			/>
		</div>
	);
}
