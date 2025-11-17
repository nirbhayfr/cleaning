export default function LookingFor() {
	const items = [
		{ title: "Office Cleaning", img: "/img/office-cleaning.jpg" },
		{ title: "Home Cleaning", img: "/img/banner-2.jpg" },
		{ title: "Kitchen Cleaning", img: "/img/kitchen-cleaning.jpg" },
		{ title: "Sofa Cleaning", img: "/img/banner-1.jpg" },
		{ title: "Bathroom Cleaning", img: "/img/bathroom-cleaning.jpg" },
		{ title: "Glass Cleaning", img: "/img/glass-cleaning.jpg" },
		{ title: "Commercial Cleaning", img: "/img/commercial-cleaning.jpg" },
		{ title: "Balcony Cleaning", img: "/img/balcony-cleaning.jpeg" },
		{ title: "Carpet Cleaning", img: "/img/carpet-cleaning.jpeg" },
	];

	return (
		<section className="looking-section">
			<h2 className="looking-title">What are you looking for?</h2>

			<div className="looking-grid">
				{items.map((item, index) => (
					<div className="looking-card" key={index}>
						<img src={item.img} alt={item.title} />
						<p>{item.title}</p>
					</div>
				))}
			</div>
		</section>
	);
}
