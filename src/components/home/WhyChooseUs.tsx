import {
	BadgeCheck,
	Sparkles,
	Wallet,
	ShieldCheck,
	UserCheck,
	Building2,
} from "lucide-react";

export default function WhyChooseUs() {
	const items = [
		{ id: 1, title: "Advanced Equipment", icon: <BadgeCheck /> },
		{ id: 2, title: "All Services Under One Roof", icon: <Building2 /> },
		{ id: 3, title: "Affordable Pricing", icon: <Wallet /> },
		{ id: 4, title: "100% Quality Guarantee", icon: <ShieldCheck /> },
		{ id: 5, title: "Personalized Services", icon: <Sparkles /> },
		{ id: 6, title: "Trained & Verified Staff", icon: <UserCheck /> },
	];

	return (
		<section className="why-section">
			<h2>Why Choose Us?</h2>

			<div className="why-grid">
				{items.map((item) => (
					<div key={item.id} className="why-card">
						<div className="icon">{item.icon}</div>
						<p>{item.title}</p>
					</div>
				))}
			</div>
		</section>
	);
}
