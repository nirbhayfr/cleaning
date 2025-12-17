import { useSearchParams } from "react-router-dom";
import type { SubCategory } from "../../../api/category";

export default function CategorySlider({
	subCategories,
}: {
	subCategories: SubCategory[];
}) {
	const [, setSearchParams] = useSearchParams();

	const handleClick = (subCategory: string) => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);
			params.set("sub-category", subCategory);

			return params;
		});
	};
	return (
		<div className="hsw-wrapper">
			<div className="hsw-container">
				{subCategories.map((card, i) => (
					<div
						className="hsw-card"
						key={`${card.title}-${i}`}
						onClick={() => handleClick(card.key)}
					>
						<img
							src={card.image || undefined}
							className="hsw-img"
							alt={card.title}
						/>
						<p className="hsw-title">{card.title}</p>
					</div>
				))}
			</div>
		</div>
	);
}
