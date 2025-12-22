import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => setSidebarOpen((prev) => !prev);

	return (
		<main className="admin-main">
			<header className="admin-header">
				<div className="header-left">
					<button
						className="sidebar-toggler mobile-only"
						onClick={toggleSidebar}
					>
						☰
					</button>
					<div className="header-logo">
						<img src="/img/logo-no-bg.png" alt="Logo" />
					</div>
				</div>
			</header>

			<aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
				<nav className="sidebar-nav">
					<NavLink to="/admin/home" className="sidebar-link">
						Home
					</NavLink>
					<NavLink to="/admin/category" className="sidebar-link">
						Category
					</NavLink>
					<NavLink to="/admin/products" className="sidebar-link">
						Products
					</NavLink>
					<NavLink to="/admin/orders" className="sidebar-link">
						Orders
					</NavLink>
				</nav>
			</aside>

			<div
				className={`overlay ${sidebarOpen ? "show" : ""}`}
				onClick={() => setSidebarOpen(false)}
			></div>

			<section className="content">
				<Outlet />
			</section>
		</main>
	);
}
