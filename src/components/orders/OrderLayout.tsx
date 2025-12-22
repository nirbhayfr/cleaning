import { Link, Outlet } from "react-router-dom";

export default function OrdersLayout() {
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

				<Link to="/orders/myorders" className="orders-primary-btn">
					My Orders
				</Link>
			</div>

			{/* Filters */}
			<div className="orders-filters">
				<input
					type="text"
					placeholder="Search by order ID or customer"
					className="orders-search"
				/>

				<select className="orders-select">
					<option>Status</option>
					<option>Pending</option>
					<option>Completed</option>
					<option>Cancelled</option>
				</select>

				<select className="orders-select">
					<option>Date</option>
					<option>Today</option>
					<option>This Week</option>
					<option>This Month</option>
				</select>
			</div>

			{/* Content */}
			<div className="orders-grid">
				<Outlet />
			</div>
		</div>
	);
}
