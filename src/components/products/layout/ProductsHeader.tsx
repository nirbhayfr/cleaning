import { ArrowLeft } from "lucide-react";
import Cart from "../../Cart";
import { Link } from "react-router-dom";

export default function ProductsHeader() {
	return (
		<header className="products-header">
			<Link to="/" className="products-back-btn">
				<ArrowLeft size={20} />
			</Link>

			<Cart />
		</header>
	);
}
