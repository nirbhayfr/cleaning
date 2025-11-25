import { topCategories } from "../../../../data/data";

export default function CategorySlider() {
	return (
		<div className="hsw-wrapper">
			<div className="hsw-container">
				{/* {topCategories.map((cat) =>
					cat.cards.map((card, i) => (
						<div className="hsw-card" key={`${cat.key}-${i}`}>
							<img
								src={card.img}
								className="hsw-img"
								alt={card.title}
							/>
							<p className="hsw-title">{card.title}</p>
						</div>
					))
				)} */}
				{topCategories[0].cards.map((card, i) => (
					<div className="hsw-card" key={`${card.title}-${i}`}>
						<img
							src={card.img}
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
