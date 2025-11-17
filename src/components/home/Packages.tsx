export default function Packages() {
	const packagesData = [
		{
			id: 1,
			title: "Basic Cleaning",
			price: "₹499",
			image: "/img/small-house.jpg",
		},
		{
			id: 2,
			title: "Deep Cleaning",
			price: "₹799",
			image: "/img/medium-house.jpg",
		},
		{
			id: 3,
			title: "Premium Cleaning",
			price: "₹999",
			image: "/img/large-house.jpeg",
		},
	];

	return (
		<section className="packages-section">
			<h2>Budget Friendly Home Cleaning Packages</h2>

			<div className="packages-grid">
				{packagesData.map((pkg) => (
					<div key={pkg.id} className="package-card">
						<img src={pkg.image} alt={pkg.title} />

						<div className="package-price">
							Starting at {pkg.price}
						</div>

						<div className="package-footer">
							<span>{pkg.title}</span>
							<button>Book Now</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
