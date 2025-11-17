import { useEffect, useRef, useState } from "react";

const videos = ["/vid/video-1.mp4", "/vid/video-2.mp4", "/vid/video-3.mp4"];

export default function VideoCarousel() {
	const [current, setCurrent] = useState(0);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleEnd = () => {
			setCurrent((prev) => (prev + 1) % videos.length);
		};

		video.addEventListener("ended", handleEnd);
		video.play().catch(() => {});

		return () => video.removeEventListener("ended", handleEnd);
	}, [current]);

	return (
		<div className="video-carousel-wrapper">
			<h2>Explore Our Services</h2>
			<video
				ref={videoRef}
				src={videos[current]}
				className="video-carousel-video"
				preload="auto"
				muted
				playsInline
				autoPlay
			/>

			<div className="video-carousel-dots">
				{videos.map((_, index) => (
					<div
						key={index}
						className={`dot ${
							current === index ? "active" : ""
						}`}
						onClick={() => setCurrent(index)}
					/>
				))}
			</div>
		</div>
	);
}
