import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ProductsFilters() {
	const [openDropdown, setOpenDropdown] = useState<"sort" | "rating" | null>(
		null
	);

	const [sortValue, setSortValue] = useState("Most Popular");
	const [ratingValue, setRatingValue] = useState("All Ratings");

	const sortOptions = [
		"Most Popular",
		"Price: Low to High",
		"Price: High to Low",
		"Newest First",
	];

	const ratingOptions = [
		"All Ratings",
		"4★ & above",
		"3★ & above",
		"2★ & above",
	];

	return (
		<div className="products-filters">
			{/* SORT */}
			<div
				className="filter-box"
				onClick={() =>
					setOpenDropdown(
						openDropdown === "sort" ? null : "sort"
					)
				}
			>
				<span>{sortValue}</span>
				<ChevronDown size={16} />

				{openDropdown === "sort" && (
					<div className="dropdown">
						{sortOptions.map((opt) => (
							<div
								key={opt}
								className={`dropdown-item ${
									sortValue === opt ? "active" : ""
								}`}
								onClick={() => {
									setSortValue(opt);
									setOpenDropdown(null);
								}}
							>
								{opt}
							</div>
						))}
					</div>
				)}
			</div>

			{/* RATING */}
			<div
				className="filter-box"
				onClick={() =>
					setOpenDropdown(
						openDropdown === "rating" ? null : "rating"
					)
				}
			>
				<span>{ratingValue}</span>
				<ChevronDown size={16} />

				{openDropdown === "rating" && (
					<div className="dropdown">
						{ratingOptions.map((opt) => (
							<div
								key={opt}
								className={`dropdown-item ${
									ratingValue === opt ? "active" : ""
								}`}
								onClick={() => {
									setRatingValue(opt);
									setOpenDropdown(null);
								}}
							>
								{opt}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
