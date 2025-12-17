import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	useFetchAllCategories,
	useFetchSubCategories,
} from "../../hooks/useCategories";

export default function LookingFor() {
	const [activePopup, setActivePopup] = useState<string | null>(null);
	const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
	const { data: categories = [], isLoading } = useFetchAllCategories();
	if (isLoading) return <p>Loading categories...</p>;
	if (!categories.length) return <p>No categories found.</p>;

	const activeCategories = categories.filter((cat) => cat.isActive);

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
					{activeCategories.map((cat) => (
						<div
							className="looking-card"
							onClick={() => {
								setActivePopup(cat.key);
								setOpenCategoryId(cat._id);
							}}
							key={cat.key}
						>
							<img
								src={cat.image?.trim() || undefined}
								alt={cat.title}
							/>
							<p>{cat.title}</p>
						</div>
					))}
				</div>
			</section>

			{/* POPUP for Selected Category */}
			{activePopup && (
				<SubCategoryCard
					setActivePopup={setActivePopup}
					activePopup={activePopup}
					categoryId={openCategoryId}
				/>
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

function SubCategoryCard({
	setActivePopup,
	activePopup,
	categoryId,
}: {
	setActivePopup: (val: string | null) => void;
	activePopup: string | null;
	categoryId: string | null;
}) {
	const navigate = useNavigate();

	const { data: subs = [], isLoading } = useFetchSubCategories(categoryId!);
	const activeSubCategories = subs.filter((cat) => cat.isActive);

	if (!activePopup) return null;

	const handleClick = (subCatKey: string) => {
		const params = new URLSearchParams({
			category: activePopup,
			"sub-category": subCatKey,
		});

		navigate(`/products?${params.toString()}`);
	};
	return (
		<>
			<div className="lf-bottom-popup open">
				<button
					className="lf-popup-close-btn"
					onClick={() => setActivePopup(null)}
				>
					✕
				</button>

				<h3>Categories</h3>

				<div className="lf-popup-grid">
					{isLoading && <p>Loading...</p>}
					{activeSubCategories.length > 0 ? (
						activeSubCategories.map((card, i) => (
							<div
								key={i}
								onClick={() => handleClick(card.key)}
							>
								<div className="lf-popup-card">
									<div className="lf-popup-text">
										<h4>{card.title}</h4>
									</div>

									<div className="lf-popup-image-box">
										<img
											src={
												card.image?.trim() ||
												undefined
											}
											alt={card.title}
										/>
									</div>
								</div>
							</div>
						))
					) : (
						<p>No subcategories found.</p>
					)}
				</div>
			</div>

			{/* Backdrop */}
			<div
				className="lf-popup-backdrop"
				onClick={() => setActivePopup(null)}
			></div>
		</>
	);
}
