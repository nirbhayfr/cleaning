import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
	const finalPrice = useAppSelector((state) => state.cart.finalPrice);
	const [paymentMode, setPaymentMode] = useState<"cod" | "online">("cod");
	const [selectedOnlineOption, setSelectedOnlineOption] = useState("");

	return (
		<div className="checkout-wrapper">
			<Link to="/cart" className="cart-back-btn">
				<ArrowLeft />
			</Link>
			<h2 className="checkout-title">Checkout</h2>

			{/* SHIPPING DETAILS FORM */}
			<div className="checkout-section">
				<h3 className="section-title">Shipping Details</h3>

				<form className="checkout-form">
					<input type="text" placeholder="Full Name" required />
					<input
						type="text"
						placeholder="Phone Number"
						required
					/>
					<input type="text" placeholder="House No." required />
					<input
						type="text"
						placeholder="Street / Area"
						required
					/>
					<input type="text" placeholder="City" required />
					<input type="text" placeholder="Pincode" required />
				</form>
			</div>

			{/* PAYMENT OPTIONS */}
			<div className="checkout-section">
				<h3 className="section-title">Payment Method</h3>

				<div className="payment-options">
					<label
						className={`pay-option ${
							paymentMode === "cod" ? "active" : ""
						}`}
					>
						<input
							type="radio"
							name="payment"
							checked={paymentMode === "cod"}
							onChange={() => setPaymentMode("cod")}
						/>
						Cash on Delivery
					</label>

					<label
						className={`pay-option ${
							paymentMode === "online" ? "active" : ""
						}`}
					>
						<input
							type="radio"
							name="payment"
							checked={paymentMode === "online"}
							onChange={() => setPaymentMode("online")}
						/>
						Pay Online
					</label>
				</div>

				{/* ONLINE PAYMENT OPTIONS */}
				{paymentMode === "online" && (
					<div className="online-pay-grid">
						<div
							className={`online-pay-card ${
								selectedOnlineOption === "phonepe"
									? "selected"
									: ""
							}`}
							onClick={() =>
								setSelectedOnlineOption("phonepe")
							}
						>
							<img src="/img/phonepe.png" alt="PhonePe" />
							<p>UPI — PhonePe</p>
						</div>

						<div
							className={`online-pay-card ${
								selectedOnlineOption === "gpay"
									? "selected"
									: ""
							}`}
							onClick={() =>
								setSelectedOnlineOption("gpay")
							}
						>
							<img src="/img/gpay.png" alt="Google Pay" />
							<p>UPI — Google Pay</p>
						</div>

						<div
							className={`online-pay-card ${
								selectedOnlineOption === "debit"
									? "selected"
									: ""
							}`}
							onClick={() =>
								setSelectedOnlineOption("debit")
							}
						>
							<img src="/img/card.png" alt="Debit Card" />
							<p>Debit Card</p>
						</div>

						<div
							className={`online-pay-card ${
								selectedOnlineOption === "credit"
									? "selected"
									: ""
							}`}
							onClick={() =>
								setSelectedOnlineOption("credit")
							}
						>
							<img src="/img/card.png" alt="Credit Card" />
							<p>Credit Card</p>
						</div>
					</div>
				)}
			</div>

			{/* PAY NOW */}
			<button className="pay-btn">Pay ₹{finalPrice}</button>
		</div>
	);
}
