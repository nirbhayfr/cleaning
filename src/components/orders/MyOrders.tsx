import { Calendar, Clock, MapPin } from "lucide-react";
import { useFetchWorkerOrders, useOrderCompleted } from "../../hooks/useorders";
import type { Order } from "../../api/order";
import type { User } from "../../api/auth";
import { decryptData } from "../../encryption/crypto";
import { toast } from "sonner";

export default function MyOrders() {
	const user = decryptData(localStorage.getItem("user")!) as User;
	const workerId = user?._id;

	const { data: orders, isLoading, error } = useFetchWorkerOrders(workerId!);
	const completeMutation = useOrderCompleted();

	const handleComplete = (orderId: string) => {
		completeMutation.mutate(orderId, {
			onSuccess: () => {
				toast.success("Order marked as completed");
			},
			onError: () => {
				toast.error("Failed to complete order");
			},
		});
	};

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Failed to load your orders</p>;

	if (!orders?.length) {
		return <p>No orders assigned to you</p>;
	}

	return (
		<>
			{orders.map((order: Order) => (
				<div key={order._id} className="order-card">
					<span className="order-category">
						{order.products[0]?.category}
					</span>

					<h3 className="order-subcategory">
						{order.products.map((p) => p.title).join(", ")}
					</h3>

					<div className="order-row">
						<MapPin size={16} />
						<span>{order.shippingAddress.addressLine}</span>
					</div>

					<div className="order-row">
						<Calendar size={16} />
						<span>{order.shippingAddress.date}</span>
					</div>

					<div className="order-row">
						<Clock size={16} />
						<span>{order.shippingAddress.time}</span>
					</div>

					{order.isCompleted ? (
						<span className="order-status completed">
							Completed
						</span>
					) : (
						<button
							className="order-complete-btn"
							onClick={() => handleComplete(order._id)}
							disabled={completeMutation.isPending}
						>
							Mark as Completed
						</button>
					)}
				</div>
			))}
		</>
	);
}
