import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { decryptData } from "../../encryption/crypto";
import type { User } from "../../api/auth";
import { useFetchUserOrders } from "../../hooks/useorders";
import type { Order } from "../../api/order";

export default function ProfilePage() {
	const navigate = useNavigate();

	const stored = localStorage.getItem("user");
	const user: User | null = stored ? (decryptData(stored) as User) : null;

	const { data: orders, isLoading } = useFetchUserOrders(
		user?._id as string
	);

	const handleLogout = () => {
		localStorage.removeItem("user");
		toast.success("Logged out successfully");
		navigate("/login");
	};

	if (!user) {
		navigate("/login");
		return null;
	}

	return (
		<div className="profile-page">
			{/* PROFILE CARD */}
			<div className="profile-card">
				<h2>Profile</h2>

				<div className="profile-row">
					<span>Name</span>
					<strong>{user.name}</strong>
				</div>

				<div className="profile-row">
					<span>Email</span>
					<strong>{user.email}</strong>
				</div>

				<div className="profile-row">
					<span>Role</span>
					<strong>{user.role}</strong>
				</div>

				<div className="profile-row">
					<span>Joined</span>
					<strong>
						{new Date(user.createdAt).toLocaleDateString()}
					</strong>
				</div>

				<button className="logout-btn" onClick={handleLogout}>
					Logout
				</button>
			</div>

			{/* MY ORDERS */}
			<div className="my-orders-section">
				<h2>My Orders</h2>

				{isLoading && <p>Loading orders...</p>}

				{orders?.length === 0 && <p>No orders found</p>}

				<div className="orders-list">
					{orders?.map((order: Order) => (
						<div key={order._id} className="order-item">
							<div>
								<strong>
									{order.products
										.map((p) => p.title)
										.join(", ")}
								</strong>
								<p>₹{order.totalAmount}</p>
							</div>

							<span
								className={`order-status ${
									order.isCompleted
										? "completed"
										: order.isTaken
										? "taken"
										: "pending"
								}`}
							>
								{order.isCompleted
									? "Completed"
									: order.isTaken
									? "In Progress"
									: "Pending"}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
