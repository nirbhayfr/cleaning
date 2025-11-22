import { Home, MessageCircleMore, Phone, Tag, User, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Menubar() {
	const [hideMenu, setHideMenu] = useState(false);
	const [popupOpen, setPopupOpen] = useState(false);
	const location = useLocation();
	const pathname = location.pathname;

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
							<div className="popup-card">
								<img
									src="/img/bathroom-cleaning.jpg"
									alt=""
								/>
								<p>Bathroom</p>
							</div>

							<div className="popup-card">
								<img
									src="/img/kitchen-cleaning.jpg"
									alt=""
								/>
								<p>Kitchen</p>
							</div>

							<div className="popup-card">
								<img
									src="/img/home-cleaning.jpeg"
									alt=""
								/>
								<p>Home</p>
							</div>

							<div className="popup-card">
								<img
									src="/img/glass-cleaning.jpg"
									alt=""
								/>
								<p>Glass</p>
							</div>
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
					<Home size={22} />
					<span>Home</span>
				</Link>

				<Link className="menu-item" to="#">
					<Phone size={22} />
					<span>Phone</span>
				</Link>

				<Link className="menu-item" to="#">
					<Tag size={26} />
					<span>Top Deals</span>
				</Link>

				<Link className="menu-item" to="#">
					<MessageCircleMore size={22} />
					<span>Message</span>
				</Link>

				<Link
					className={`menu-item ${
						pathname === "/profile" ? "active" : ""
					}`}
					to="#"
				>
					<User size={26} />
					<span>Profile</span>
				</Link>
			</nav>
		</>
	);
}

export default Menubar;
