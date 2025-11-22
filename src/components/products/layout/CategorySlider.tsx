export default function CategorySlider() {
	const slides = [
		{ img: "/img/bathroom-cleaning.jpg", title: "Bathroom Deep Clean" },
		{ img: "/img/banner-3.jpg", title: "Kitchen Cleaning" },
		{ img: "/img/home-cleaning.jpeg", title: "Home Cleaning" },
		{ img: "/img/glass-cleaning.jpg", title: "Glass Cleaning" },
	];

	return (
		<div className="hsw-wrapper">
			<div className="hsw-container">
				{slides.map((slide, i) => (
					<div className="hsw-card" key={i}>
						<img
							src={slide.img}
							className="hsw-img"
							alt={slide.title}
						/>

						<p className="hsw-title">{slide.title}</p>
					</div>
				))}
			</div>
		</div>
	);
}
