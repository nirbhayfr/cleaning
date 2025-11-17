import {
	Home,
	MessageCircleMore,
	Phone,
	ShoppingCart,
	Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Menubar() {
	const [hideMenu, setHideMenu] = useState(false);
	const location = useLocation();
	const pathname = location.pathname;

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const handleScroll = () => {
			if (window.scrollY > lastScrollY) {
				// scrolling down
				setHideMenu(true);
			} else {
				// scrolling up
				setHideMenu(false);
			}
			lastScrollY = window.scrollY;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav className={`mobile-menu ${hideMenu ? "hidden" : ""}`}>
			<Link
				className={`menu-item ${pathname === "/" ? "active" : ""}`}
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
					pathname === "/cart" ? "active" : ""
				}`}
				to="#"
			>
				<ShoppingCart size={22} />
				<span>Cart</span>
			</Link>
		</nav>
	);
}

export default Menubar;
