import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
	increaseQty,
	decreaseQty,
	removeFromCart,
	setFinalPrice,
} from "../../store/cartSlice";
import { ArrowLeft, BadgePercent, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CartPage() {
	const [policyOpen, setPolicyOpen] = useState(false);
	const navigate = useNavigate();
	const cart = useAppSelector((state) => state.cart.items);

	const dispatch = useAppDispatch();

	const getPrice = (price: string) => Number(price.replace(/\D/g, ""));

	const itemTotal = cart.reduce(
		(sum, item) => sum + getPrice(item.price) * item.quantity,
		0
	);

	const tax = 0;
	const totalAmount = itemTotal + tax;

	const cancellationText =
		"You can cancel your booking up to 2 hours before the scheduled service time at no extra charge. Cancellations made within 2 hours of the service start time may incur a cancellation fee of up to 20% of the service amount, depending on the work already assigned to the service partner. If a professional is already en-route or has arrived at your location, a visit fee may be charged. In case the service provider cancels the booking, you will receive a full refund or may reschedule at your convenience. For emergencies or support, please contact our customer care.";

	return (
		<div className="cart-wrapper">
			<Link to="/" className="cart-back-btn">
				<ArrowLeft />
			</Link>

			<h2 className="cart-title">My Cart</h2>

			<div className="cart-items">
				{cart.map((item) => (
					<div key={item._id} className="cart-item">
						<img
							src={item.images[0]}
							alt={item.title}
							className="cart-item-img"
						/>

						<div className="cart-item-info">
							<h3 className="cart-item-title">
								{item.title}
							</h3>

							<div className="cart-qty">
								<button
									onClick={() =>
										dispatch(
											decreaseQty(item._id)
										)
									}
								>
									–
								</button>

								<span>{item.quantity}</span>

								<button
									onClick={() =>
										dispatch(
											increaseQty(item._id)
										)
									}
								>
									+
								</button>
							</div>
						</div>

						<div className="cart-right">
							<p className="cart-price">
								₹ {getPrice(item.price)}
							</p>

							<button
								className="cart-delete-btn"
								onClick={() =>
									dispatch(removeFromCart(item._id))
								}
							>
								<Trash2 size={18} />
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="cart-offers">
				<p className="cart-offer-icon">
					<span>
						<BadgePercent />
					</span>{" "}
					Coupons and Offers
				</p>
				<p className="cart-offer-count">5 offers</p>
			</div>

			<div className="cart-payment">
				<h3>Payment Summary</h3>

				<div className="cart-row">
					<span>Item total</span>
					<span>₹ {itemTotal}</span>
				</div>

				<div className="cart-row">
					<span>Taxes and Fee</span>
					<span>₹ {tax}</span>
				</div>

				<hr />

				<div className="cart-row cart-total">
					<span>Total amount</span>
					<span>₹ {totalAmount}</span>
				</div>
			</div>

			<div className="cart-policy">
				<h4>Cancellation policy</h4>
				<p>
					{policyOpen
						? cancellationText
						: cancellationText
								.split(" ")
								.slice(0, 25)
								.join(" ")}
				</p>
				<p
					className="policy-link"
					onClick={() => setPolicyOpen((state) => !state)}
				>
					{policyOpen ? "Read less" : "Read full policy"}
				</p>
			</div>

			<button
				className="cart-pay-btn"
				disabled={totalAmount === 0}
				onClick={() => {
					dispatch(setFinalPrice(totalAmount));
					navigate("/checkout");
				}}
			>
				Proceed To Pay
			</button>
		</div>
	);
}
