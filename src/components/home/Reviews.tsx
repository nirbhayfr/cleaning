import { Quote } from "lucide-react";

export default function Reviews() {
	const stats = [
		{ id: 1, number: "1M+", label: "Happy Customers" },
		{ id: 2, number: "100K+", label: "Service Guarantee" },
		{ id: 3, number: "10K+", label: "Active Service Customers" },
		{ id: 4, number: "50K+", label: "Completed Services" },
	];

	const reviews = [
		{
			name: "Riya Sharma",
			text: "Amazing service! My home has never been this clean before.",
		},
		{
			name: "Aman Verma",
			text: "Very professional and well-trained staff. Highly recommend!",
		},
		{
			name: "Priya Yadav",
			text: "Quick, affordable and reliable! Will book again soon.",
		},
		{
			name: "Karan Singh",
			text: "Top-notch cleaning quality. Worth every rupee!",
		},
	];

	return (
		<section className="reviews-section">
			{/* --- STATS GRID --- */}
			<div className="stats-grid">
				{stats.map((item) => (
					<div key={item.id} className="stats-card">
						<h3>{item.number}</h3>
						<p>{item.label}</p>
					</div>
				))}
			</div>

			{/* --- CONTINUOUS REVIEW SLIDER --- */}
			<h2 className="review-title">What Our Customers Say</h2>

			<div className="reviews-slider">
				<div className="slider-track">
					{reviews.concat(reviews).map((review, index) => (
						<div key={index} className="review-card">
							<Quote className="quote-icon" />
							<p className="review-text">
								"{review.text}"
							</p>
							<h4 className="review-name">
								— {review.name}
							</h4>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
