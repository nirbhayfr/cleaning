import { Search } from "lucide-react";

function Header() {
	// const topGrid = [
	// 	{
	// 		img: "/img/top-1.jpeg",
	// 		text: "Bedroom Cleaning",
	// 	},
	// 	{ img: "/img/top-2.jpeg", text: "Kitchen Cleaning" },
	// 	{ img: "/img/top-3.jpeg", text: "Bathroom Cleaning" },
	// 	{ img: "/img/top-4.jpeg", text: "Carpet Cleaning" },
	// ];

	// const bottomGrid = [
	// 	{ img: "/img/commercial-cleaning.jpg", text: "Commercial Cleaning" },
	// 	{ img: "/img/home-cleaning.jpeg", text: "Home cleaning" },
	// 	{ img: "/img/balcony-cleaning.jpeg", text: " Balcony Cleaning" },
	// ];

	const topGridNew = [
		{
			title: "Home Cleaning",
			img: "/img/home-icon.jpeg",
			offer: "Get 100 Rs Off",
		},
		{
			title: "Bathroom Cleaning",
			img: "/img/bathroom-icon.jpg",
			offer: "Get 100 Rs Off",
		},
		{
			title: "Carpet Cleaning",
			img: "/img/carpet-icon.jpeg",
			offer: "Get 199 Rs Off",
		},
		{
			title: "Kitchen Cleaning",
			img: "/img/kitchen-icon.jpg",
			offer: "Get 249 Rs Off",
		},
	];

	return (
		<header className="header">
			<div className="header-bg">
				{/* <div className="top-features">
					{topGrid.map((item, i) => (
						<div key={i} className="feature-card">
							<img src={item.img} alt={item.text} />
							<span>{item.text}</span>
						</div>
					))}
				</div> */}

				<div className="offer-grid">
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
				</div>

				<div className="search-section">
					<div className="search-bar">
						<Search className="search-icon" />
						<input
							type="text"
							placeholder="Search for service..."
						/>
					</div>
				</div>

				{/* <div className="bottom-grid">
					{bottomGrid.map((item, i) => (
						<div
							key={i}
							className="bottom-card"
							style={{
								backgroundImage: `url(${item.img})`,
							}}
						>
							<p>{item.text}</p>
						</div>
					))}
				</div> */}
			</div>
		</header>
	);
}

export default Header;
