import { useState } from "react";
import { Link } from "react-router-dom";

export default function LookingFor() {
	const [activePopup, setActivePopup] = useState<string | null>(null);

	const topCategories = [
		{
			key: "cleaning",
			title: "Cleaning Service",
			img: "/img/office-cleaning.jpg",
			cards: [
				{
					title: "Home Deep Cleaning",
					img: "/img/sofa.png",
				},
				{
					title: "Kitchen Cleaning",
					img: "/img/sink.png",
				},
			],
		},
		{
			key: "fullhouse",
			title: "Full House Cleaning",
			img: "/img/banner-2.jpg",
			cards: [
				{
					title: "1 BHK Deep Clean",
					img: "/img/sofa.png",
				},
				{
					title: "2 BHK Deep Clean",
					img: "/img/sink.png",
				},
			],
		},
		{
			key: "commercial",
			title: "Commercial Cleaning",
			img: "/img/commercial-cleaning.jpg",
			cards: [
				{
					title: "Office Cleaning",
					img: "/img/sofa.png",
				},
				{
					title: "Shop Cleaning",
					img: "/img/sink.png",
				},
			],
		},
	];
	const comingSoon = [
		{ title: "Female Home Salon", img: "/img/hair-salon.jpeg" },
		{ title: "Electrician", img: "/img/electrician.jpeg" },
		{ title: "Plumber", img: "/img/plumber.jpeg" },
		{ title: "Pest Control", img: "/img/pest-control.jpeg" },
		{ title: "Balloon Decoration", img: "/img/balloon.jpeg" },
		{ title: "Contract Work", img: "/img/contract.jpeg" },
	];

	return (
		<>
			<section className="looking-section">
				<h2 className="looking-title">What are you looking for?</h2>

				<div className="looking-grid">
					{topCategories.map((cat) => (
						<div
							className="looking-card"
							onClick={() => setActivePopup(cat.key)}
							key={cat.key}
						>
							<img src={cat.img} alt={cat.title} />
							<p>{cat.title}</p>
						</div>
					))}
				</div>
			</section>

			{/* POPUP for Selected Category */}
			{activePopup && (
				<>
					<div className={`lf-bottom-popup open`}>
						<button
							className="lf-popup-close-btn"
							onClick={() => setActivePopup(null)}
						>
							✕
						</button>

						<h3>Categories</h3>

						<div className="lf-popup-grid">
							{topCategories
								.find((c) => c.key === activePopup)
								?.cards.map((card, i) => (
									<Link to="/products" key={i}>
										<div className="lf-popup-card">
											<div className="lf-popup-text">
												<h4>
													{card.title}
												</h4>
											</div>

											<div className="lf-popup-image-box">
												<img
													src={card.img}
													alt={
														card.title
													}
												/>
											</div>
										</div>
									</Link>
								))}
						</div>
					</div>

					<div
						className="lf-popup-backdrop"
						onClick={() => setActivePopup(null)}
					></div>
				</>
			)}

			<section className="looking-section">
				<h2 className="looking-title">Coming Soon</h2>

				<div className="looking-grid">
					{comingSoon.map((item, index) => (
						<div className="looking-card faded" key={index}>
							<span className="coming-tag">
								Coming Soon
							</span>

							<img src={item.img} alt={item.title} />
							<p>{item.title}</p>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
