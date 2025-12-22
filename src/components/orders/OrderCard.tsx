import { MapPin, Calendar, Clock } from "lucide-react";
import type { Order } from "../../api/order";
import { useAcceptOrder } from "../../hooks/useorders";
import { toast } from "sonner";
import { decryptData } from "../../encryption/crypto";
import type { User } from "../../api/auth";

interface Props {
	order: Order;
}

export default function OrderCard({ order }: Props) {
	const acceptMutation = useAcceptOrder();
	const user = decryptData(localStorage.getItem("user")!) as User;

	const handleAccept = () => {
		acceptMutation.mutate(
			{
				orderId: order._id,
				workerId: user._id,
			},
			{
				onSuccess: () => {
					toast.success("Order Accepted");
				},
				onError: () => {
					toast.error("Failed to aceept order.");
				},
			}
		);
	};

	return (
		<div className="order-card">
			<span className="order-category">
				{order.products[0]?.category}
			</span>

			<h3 className="order-subcategory">
				{order.products[0]?.subcategory}
			</h3>

			<div className="order-row">
				<span>
					{order.products.map((prod) => prod.title).join(", ")}
				</span>
			</div>

			<div className="order-row">
				<MapPin size={16} />
				<span>
					{order.shippingAddress.addressLine},{" "}
					{order.shippingAddress.city}
				</span>
			</div>

			<div className="order-row">
				<Calendar size={16} />
				<span>{order.shippingAddress.date}</span>
			</div>

			<div className="order-row">
				<Clock size={16} />
				<span>{order.shippingAddress.time}</span>
			</div>

			<button className="order-accept-btn" onClick={handleAccept}>
				Accept Order
			</button>
		</div>
	);
}
