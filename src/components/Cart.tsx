import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";


function Cart() {
	const cart = useAppSelector((state) => state.cart.items);
	return (
		<div className="header-cart">
			<Link to="/cart">
			<div className="cart-icon-wrap">
				
				<ShoppingCart className="cart-icon" size={20} />

				<span className="cart-badge">{cart.length}</span>
			</div>
			</Link>
		</div>
	);
}

export default Cart;
