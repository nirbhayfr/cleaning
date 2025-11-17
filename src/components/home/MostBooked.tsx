export default function MostBooked() {
	const items = [
		{
			title: "Sofa Deep Cleaning",
			img: "/img/banner-1.jpg",
		},
		{
			title: "Kitchen Deep Cleaning",
			img: "/img/kitchen-cleaning.jpg",
		},
		{
			title: "Full Home Cleaning",
			img: "/img/banner-2.jpg",
		},
		{
			title: "Bathroom Deep Cleaning",
			img: "/img/bathroom-cleaning.jpg",
		},
	];

	return (
		<section className="most-booked">
			<h2 className="mb-title">Our Most Booked Services</h2>

			<div className="marquee">
				<div className="marquee-track">
					{items.concat(items).map((item, i) => (
						<div className="mb-card" key={i}>
							<img src={item.img} alt={item.title} />
							<div className="mb-overlay">
								<h3>{item.title}</h3>
								<button>Book Now</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
