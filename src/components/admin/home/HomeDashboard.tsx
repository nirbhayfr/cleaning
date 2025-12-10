"use client";

import type { Product } from "../../../api/product";
import {
	useFetchAllCategories,
	useFetchSubCategories,
} from "../../../hooks/useCategories";
import { useGetAllProducts } from "../../../hooks/useProduct";
import { Link } from "react-router-dom";

export default function HomeDashboard() {
	const { data: categories = [], isLoading: catLoading } =
		useFetchAllCategories();
	const { data: products = [], isLoading: prodLoading } =
		useGetAllProducts();

	// Count Active / Inactive
	const activeCategories = categories.filter((c) => c.isActive).length;
	const inactiveCategories = categories.length - activeCategories;

	const activeProducts = products.filter((p: Product) => p.inStock).length;
	const inactiveProducts = products.length - activeProducts;

	// Count all subcategories

	if (catLoading || prodLoading) return <p>Loading dashboard...</p>;

	return (
		<div className="admin-home-container">
			<h2 className="page-title">Admin Dashboard</h2>

			{/* QUICK ACTIONS */}
			<div className="quick-actions">
				<Link to="/admin/products">
					<button className="quick-btn">Manage Products</button>
				</Link>

				<Link to="/admin/category">
					<button className="quick-btn">
						Manage Categories
					</button>
				</Link>

				<Link to="/admin/products">
					<button className="quick-btn">+ Create Product</button>
				</Link>
			</div>

			<div className="stats-grid main-stats">
				<div className="stat-card stat-primary">
					<h3>Total Products</h3>
					<p className="stat-number">{products.length}</p>
					<span className="stat-sub">
						Active: {activeProducts} / Inactive:{" "}
						{inactiveProducts}
					</span>
				</div>

				<div className="stat-card stat-secondary">
					<h3>Total Categories</h3>
					<p className="stat-number">{categories.length}</p>
					<span className="stat-sub">
						Active: {activeCategories} / Inactive:{" "}
						{inactiveCategories}
					</span>
				</div>
			</div>

			<div className="stats-grid sub-stats">
				{categories.map((cat) => (
					<div className="stat-card subcat-card" key={cat._id}>
						<h3>{cat.title} Subcategories</h3>
						<SubCategoryStats categoryId={cat._id} />
					</div>
				))}
			</div>

			{/* RECENT PRODUCTS */}
			<div className="recent-products-section">
				<h3>Recently Added Products</h3>

				{products.length === 0 ? (
					<p>No products found.</p>
				) : (
					<div className="recent-product-list">
						{products
							.slice(-5) // last 5 products
							.reverse()
							.map((p: Product) => (
								<div
									key={p._id}
									className="recent-product-card"
								>
									<img
										src={
											p.images?.[0] ||
											"/placeholder.png"
										}
										className="recent-product-img"
										alt={p.title}
									/>

									<div className="recent-product-info">
										<strong className="product-title">
											{p.title}
										</strong>

										<div className="product-meta">
											<span className="meta-tag">
												Category:{" "}
												<b>{p.category}</b>
											</span>

											<span className="meta-tag">
												Price:{" "}
												<b>{p.price}</b>
											</span>

											<span
												className={`status-badge ${
													p.inStock
														? "active"
														: "inactive"
												}`}
											>
												{p.inStock
													? "Active"
													: "Inactive"}
											</span>
										</div>
									</div>
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	);
}

function SubCategoryStats({ categoryId }: { categoryId: string }) {
	const { data: subs = [] } = useFetchSubCategories(categoryId);

	const total = subs.length;
	const active = subs.filter((s) => s.isActive).length;
	const inactive = total - active;

	return (
		<>
			<p className="stat-number">{total}</p>
			<span className="stat-sub">
				Active: {active} / Inactive: {inactive}
			</span>
		</>
	);
}
