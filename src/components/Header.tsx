import ImageCarousel from "./home/Carousel";
import SearchInput from "./Search";
import Cart from "./Cart";

function Header() {
	return (
		<header className="header">
			<div className="header-bg">
				<div className="header-logo-row">
					<div className="header-logo">
						<img src="/img/logo-no-bg.png" alt="Logo" />
					</div>
					<Cart />
				</div>
				<ImageCarousel />
				<SearchInput />
			</div>
		</header>
	);
}

export default Header;
