import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "../store/hooks";


function Cart() {
	const cart = useAppSelector((state) => state.cart.items);
	return (
		<div className="header-cart">
			<div className="cart-icon-wrap">
				
				<ShoppingCart className="cart-icon" size={20} />

				<span className="cart-badge">{cart.length}</span>
			</div>
		</div>
	);
}

export default Cart;
