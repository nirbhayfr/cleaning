import { Link, Outlet, useLocation } from "react-router-dom";

export default function OrdersLayout() {
	const location = useLocation();
	return (
		<div className="orders-page">
			{/* Header */}
			<div className="orders-header">
				<div>
					<h1 className="orders-title">Orders</h1>
					<p className="orders-subtitle">
						View and manage all customer orders
					</p>
				</div>

				{location.pathname !== "/orders/myorders" && (
					<Link
						to="/orders/myorders"
						className="orders-primary-btn"
					>
						My Orders
					</Link>
				)}
			</div>

			{/* Filters */}
			<div className="orders-filters">
				<input
					type="text"
					placeholder="Search by order ID or customer"
					className="orders-search"
				/>
			</div>

			{/* Content */}
			<div className="orders-grid">
				<Outlet />
			</div>
		</div>
	);
}
