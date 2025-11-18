import { useEffect, useState } from "react";

const images = [
	"/img/main-banner-1.jpg",
	"/img/main-banner-2.jpg",
	"/img/main-banner-3.jpg",
];

export default function ImageCarousel() {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % images.length);
		}, 3000); // 3 seconds

		return () => clearInterval(interval);
	}, []);

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
					/>
				))}
			</div>
		</div>
	);
}
