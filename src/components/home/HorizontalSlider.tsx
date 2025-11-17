export default function HorizontalSwipeSlider() {
	const slides = [
		{
			img: "/img/home-cleaning.jpeg",
			title: "Home Cleaning",
		},
		{
			img: "/img/banner-3.jpg",
			title: "Kitchen Cleaning",
		},
		{
			img: "/img/banner-1.jpg",
			title: "Sofa Cleaning",
		},
		{
			img: "/img/bathroom-cleaning.jpg",
			title: "Bathroom Deep Clean",
		},
		{
			img: "/img/carpet-cleaning.jpeg",
			title: "Carpet Shampoo",
		},
	];

	return (
		<div className="hs-wrapper">
			<h2 className="hs-heading">Special Deals</h2>

			<div className="hs-container">
				{slides.map((slide, i) => (
					<div className={`hs-slide slide-${i}`} key={i}>
						<button className="hs-btn">Book Now</button>

						<img
							src={slide.img}
							alt={slide.title}
							className="hs-img"
						/>

						<p className="hs-title">{slide.title}</p>
					</div>
				))}
			</div>
		</div>
	);
}
