import { ShoppingCart } from "lucide-react";

function Cart() {
	return (
		<div className="header-cart">
			<div className="cart-icon-wrap">
				<ShoppingCart className="cart-icon" size={20} />

				<span className="cart-badge">0</span>
			</div>
		</div>
	);
}

export default Cart;
