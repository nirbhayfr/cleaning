import type { Order } from "../../api/order";
import { useFetchAllOrders } from "../../hooks/useorders";

export default function AdminOrdersPage() {
	const { data: orders, isLoading, error } = useFetchAllOrders();

	if (isLoading) return <p>Loading orders...</p>;
	if (error) return <p>Error fetching orders</p>;

	return (
		<div className="admin-orders-page">
			<h2>All Orders</h2>
			<div className="orders-list">
				{orders?.map((order: Order) => {
					// Determine status
					const status = order.isCompleted
						? "completed"
						: order.isTaken
						? "taken"
						: "pending";

					return (
						<div
							key={order._id}
							className="order-detail-card"
						>
							<h3>Order ID: {order._id}</h3>
							<p>
								Customer:{" "}
								{order.shippingAddress?.fullName ||
									"Unknown"}
							</p>
							<p>
								Products:{" "}
								{order.products
									?.map((p) => p.title)
									.join(", ")}
							</p>
							<p>
								Shipping:{" "}
								{order.shippingAddress?.addressLine},{" "}
								{order.shippingAddress?.city}
							</p>
							<p>
								Date:{" "}
								{order.shippingAddress?.date || "-"} |
								Time:{" "}
								{order.shippingAddress?.time || "-"}
							</p>
							<p>
								Status:{" "}
								<span className={`status ${status}`}>
									{status === "completed"
										? "Completed"
										: status === "taken"
										? "Taken"
										: "Pending"}
								</span>
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
