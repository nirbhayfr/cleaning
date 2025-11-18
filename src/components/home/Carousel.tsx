import { useEffect, useState } from "react";

const images = [
	"/img/main-banner-2.jpg",
	"/img/main-banner-1.jpg",
	"/img/main-banner-3.jpg",
];

export default function ImageCarousel() {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		// Duration logic
		const duration = current === 0 ? 8000 : 4000; // 8s for first slide, 4s for others

		const timer = setTimeout(() => {
			setCurrent((prev) => (prev + 1) % images.length);
		}, duration);

		return () => clearTimeout(timer);
	}, [current]);

	return (
		<div className="video-carousel-wrapper">
			<img
				src={images[current]}
				alt="carousel"
				className="video-carousel-video"
			/>

			<div className="video-carousel-dots">
				{images.map((_, index) => (
					<div
						key={index}
						className={`dot ${
							current === index ? "active" : ""
						}`}
						onClick={() => setCurrent(index)}
						style={
							{
								"--fill-time":
									index === 0 ? "8s" : "4s",
							} as React.CSSProperties
						}
					></div>
				))}
			</div>
		</div>
	);
}
