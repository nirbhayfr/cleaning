import { Home, MessageCircleMore, Phone, Tag, User, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useFetchAllCategories } from "../hooks/useCategories";

function Menubar() {
	const [hideMenu, setHideMenu] = useState(false);
	const [popupOpen, setPopupOpen] = useState(false);
	const location = useLocation();
	const pathname = location.pathname;

	const [searchParams, setSearchParams] = useSearchParams();

	const category = searchParams.get("category");
	const { data: categories = [] } = useFetchAllCategories();

	const categoryData = categories.find((c) => c.key === category);

	const handleClick = (subCategory: string) => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);
			params.set("sub-category", subCategory);

			return params;
		});
	};

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const handleScroll = () => {
			if (window.scrollY > lastScrollY) {
				setHideMenu(true);
			} else {
				setHideMenu(false);
			}
			lastScrollY = window.scrollY;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			{/* 🌟 Center Floating Menu Button (only on /product) */}
			{pathname === "/products" && (
				<button
					className="floating-center-btn"
					onClick={() => setPopupOpen(true)}
				>
					<Menu size={20} />
					<p>Menu</p>
				</button>
			)}

			{/* 🌟 Popup Overlay */}
			{popupOpen && (
				<div
					className="popup-overlay"
					onClick={() => setPopupOpen(false)}
				>
					<div
						className="popup-content"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="popup-close-btn"
							onClick={() => setPopupOpen(false)}
						>
							✕
						</button>

						<div className="popup-grid">
							{categoryData?.subCategory
								.filter((c) => c.isActive)
								.map((card) => (
									<div
										className="popup-card"
										key={card.title}
										onClick={() =>
											handleClick(card.key)
										}
									>
										<img
											src={card.image}
											alt=""
										/>
										<p>{card.title}</p>
									</div>
								))}
						</div>
					</div>
				</div>
			)}

			{/* 🌟 Bottom Menu */}
			<nav className={`mobile-menu ${hideMenu ? "hidden" : ""}`}>
				<Link
					className={`menu-item ${
						pathname === "/" ? "active" : ""
					}`}
					to="/"
				>
					<Home size={22} className="menu-item-icon" />
					<span>Home</span>
				</Link>

				<Link className="menu-item" to="#">
					<Phone size={22} className="menu-item-icon" />
					<span>Phone</span>
				</Link>

				<Link className="menu-item" to="#">
					<Tag size={22} className="menu-item-icon" />
					<span>Top Deals</span>
				</Link>

				<Link className="menu-item" to="#">
					<MessageCircleMore
						size={22}
						className="menu-item-icon"
					/>
					<span>Message</span>
				</Link>

				<Link
					className={`menu-item ${
						pathname === "/profile" || pathname === "/login"
							? "active"
							: ""
					}`}
					to="/login"
				>
					<User size={22} className="menu-item-icon" />
					<span>Login</span>
				</Link>
			</nav>
		</>
	);
}

export default Menubar;
