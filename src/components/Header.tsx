import ImageCarousel from "./home/Carousel";
import SearchInput from "./Search";

function Header() {
	// const topGridNew = [
	// 	{
	// 		title: "Home Cleaning",
	// 		img: "/img/home-icon.jpeg",
	// 		offer: "Get 100 Rs Off",
	// 	},
	// 	{
	// 		title: "Bathroom Cleaning",
	// 		img: "/img/bathroom-icon.jpg",
	// 		offer: "Get 100 Rs Off",
	// 	},
	// 	{
	// 		title: "Carpet Cleaning",
	// 		img: "/img/carpet-icon.jpeg",
	// 		offer: "Get 199 Rs Off",
	// 	},
	// 	{
	// 		title: "Kitchen Cleaning",
	// 		img: "/img/kitchen-icon.jpg",
	// 		offer: "Get 249 Rs Off",
	// 	},
	// ];

	return (
		<header className="header">
			<div className="header-bg">
				{/* <div className="offer-grid">
					{topGridNew.map((item, i) => (
						<div key={i} className="offer-card">
							<h3>{item.title}</h3>
							<img
								src={item.img}
								alt={item.title}
								className="offer-img"
							/>
							<div className="offer-footer">
								{item.offer}
							</div>
						</div>
					))}
				</div> */}

				<SearchInput />
				<ImageCarousel />
			</div>
		</header>
	);
}

export default Header;
