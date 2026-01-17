import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { decryptData } from "../../encryption/crypto";
import { useCreateOrder } from "../../hooks/useorders";
import type { User } from "../../api/auth";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";

export default function CheckoutPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = decryptData(localStorage.getItem("user")!) as User;
	const cart = useAppSelector((state) => state.cart.items);
	const createOrder = useCreateOrder();

	const [paymentMode, setPaymentMode] = useState<"cod" | "online">("cod");
	const [selectedOnlineOption, setSelectedOnlineOption] = useState("");

	const [shipping, setShipping] = useState({
		fullName: "",
		phone: "",
		house: "",
		street: "",
		city: "",
		state: "",
		pincode: "",
		date: "",
		time: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setShipping((prev) => ({ ...prev, [name]: value }));
	};

	const isShippingValid = Object.values(shipping).every(
		(value) => value.trim() !== "",
	);

	const isPaymentValid =
		paymentMode === "cod" ||
		(paymentMode === "online" && selectedOnlineOption);

	const canPay = isShippingValid && isPaymentValid;

	const handlePay = () => {
		if (!canPay) {
			return toast.warning("Fill all the details.");
		}
		const payload = {
			customerId: user._id,
			shippingAddress: {
				fullName: shipping.fullName,
				phone: shipping.phone,
				addressLine: `${shipping.house}, ${shipping.street}`,
				city: shipping.city,
				state: shipping.state,
				postalCode: shipping.pincode,
				date: shipping.date,
				time: shipping.time,
			},
			products: cart.map((item) => ({
				product: item._id, // MongoDB ObjectId
				quantity: item.quantity,
				price: Number(item.price.replace(/[^\d]/g, "")),
			})),
		};

		console.log(payload);

		createOrder.mutate(payload, {
			onSuccess: () => {
				toast.success("Order Placed Succesfully");
				dispatch(clearCart());
				navigate("/");
			},
			onError: () => {
				toast.error("There was an error in placing the order.");
			},
		});
	};

	return (
		<div className="checkout-wrapper">
			<Link to="/cart" className="cart-back-btn">
				<ArrowLeft />
			</Link>

			<h2 className="checkout-title">Checkout</h2>

			{/* SHIPPING DETAILS */}
			<div className="checkout-section">
				<h3 className="section-title">Shipping Details</h3>

				<form className="checkout-form">
					<input
						name="fullName"
						value={shipping.fullName}
						onChange={handleChange}
						placeholder="Full Name"
					/>
					<input
						name="phone"
						value={shipping.phone}
						onChange={handleChange}
						placeholder="Phone Number"
					/>
					<input
						name="house"
						value={shipping.house}
						onChange={handleChange}
						placeholder="House No."
					/>
					<input
						name="street"
						value={shipping.street}
						onChange={handleChange}
						placeholder="Street / Area"
					/>
					<input
						name="city"
						value={shipping.city}
						onChange={handleChange}
						placeholder="City"
					/>
					<input
						name="state"
						value={shipping.state}
						onChange={handleChange}
						placeholder="City"
					/>
					<input
						name="pincode"
						value={shipping.pincode}
						onChange={handleChange}
						placeholder="Pincode"
					/>

					<div className="input-wrapper">
						{!shipping.date && <label>Select date</label>}
						<input
							type="date"
							name="date"
							value={shipping.date}
							onChange={handleChange}
						/>
					</div>

					<div className="input-wrapper">
						{!shipping.time && <label>Select time</label>}
						<input
							type="time"
							name="time"
							value={shipping.time}
							onChange={handleChange}
						/>
					</div>
				</form>
			</div>

			{/* PAYMENT METHOD */}
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

				{paymentMode === "online" && (
					<div className="online-pay-grid">
						{["phonepe", "gpay", "debit", "credit"].map(
							(option) => (
								<div
									key={option}
									className={`online-pay-card ${
										selectedOnlineOption ===
										option
											? "selected"
											: ""
									}`}
									onClick={() =>
										setSelectedOnlineOption(
											option,
										)
									}
								>
									<img
										src={
											option === "phonepe"
												? "/img/phonepe.png"
												: option === "gpay"
													? "/img/gpay.png"
													: "/img/card.png"
										}
										alt={option}
									/>
									<p>{option.toUpperCase()}</p>
								</div>
							),
						)}
					</div>
				)}
			</div>

			{/* PAY BUTTON */}
			<button className="pay-btn" onClick={handlePay}>
				Pay
			</button>
		</div>
	);
}
