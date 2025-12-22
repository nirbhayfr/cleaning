import type { Order } from "../../api/order";
import { useFetchAllOrders } from "../../hooks/useorders";
import OrderCard from "./OrderCard";

export default function OrdersPage() {
	const { data: orders, isLoading, error } = useFetchAllOrders();

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error fetching orders</p>;

	const availableOrders = orders?.filter((order: Order) => !order.isTaken);

	return (
		<>
			{availableOrders.map((order: Order) => (
				<OrderCard key={order._id} order={order} />
			))}
		</>
	);
}
