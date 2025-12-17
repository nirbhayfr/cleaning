import { useState } from "react";
import {
	useFetchAllCategories,
	useFetchSubCategories,
	useToggleCategoryStatus,
	useToggleSubCategoryStatus,
} from "../../../hooks/useCategories";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiResponse } from "../../../api/category";

export default function CategorySubCategoryCards() {
	const { data: categories = [], isLoading } = useFetchAllCategories();

	const toggleCategory = useToggleCategoryStatus();
	const toggleSubCategory = useToggleSubCategoryStatus();

	const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
	const [loadingId, setLoadingId] = useState<string | null>(null);
	const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

	if (isLoading) return <p>Loading categories...</p>;
	if (!categories.length) return <p>No categories found.</p>;

	const filteredCategories = categories.filter((cat) => {
		if (filter === "active") return cat.isActive;
		if (filter === "inactive") return !cat.isActive;
		return true;
	});

	return (
		<>
			<div className="filter-bar">
				<button
					className={
						filter === "all"
							? "filter-btn active"
							: "filter-btn"
					}
					onClick={() => setFilter("all")}
				>
					All
				</button>

				<button
					className={
						filter === "active"
							? "filter-btn active"
							: "filter-btn"
					}
					onClick={() => setFilter("active")}
				>
					Active
				</button>

				<button
					className={
						filter === "inactive"
							? "filter-btn active"
							: "filter-btn"
					}
					onClick={() => setFilter("inactive")}
				>
					Inactive
				</button>
			</div>

			<div className="category-list">
				{filteredCategories.map((cat) => (
					<div key={cat._id}>
						<div
							className="category-row"
							style={{ cursor: "pointer" }}
						>
							<img
								src={cat.image || "/placeholder.png"}
								className="category-img"
								alt={cat.title}
							/>

							<div className="category-info">
								<span className="category-title">
									{cat.title}
								</span>
								<span className="category-key">
									Key: {cat.key}
								</span>
							</div>

							<button
								className={`status-btn ${
									cat.isActive
										? "active"
										: "inactive"
								}`}
								onClick={(e) => {
									e.stopPropagation();
									setLoadingId(cat._id);
									toggleCategory.mutate(cat._id, {
										onSettled: () =>
											setLoadingId(null),
									});
								}}
							>
								{loadingId === cat._id ? (
									<span className="loader"></span>
								) : cat.isActive ? (
									"Active"
								) : (
									"Inactive"
								)}
							</button>

							<button
								className="expand-btn"
								onClick={(e) => {
									e.stopPropagation();
									setOpenCategoryId(
										openCategoryId === cat._id
											? null
											: cat._id
									);
								}}
							>
								{openCategoryId === cat._id ? "▲" : "▼"}
							</button>
						</div>

						{openCategoryId === cat._id && (
							<SubCategoryList
								categoryId={cat._id}
								toggleSubCategory={toggleSubCategory}
							/>
						)}
					</div>
				))}
			</div>
		</>
	);
}

function SubCategoryList({
	categoryId,
	toggleSubCategory,
}: {
	categoryId: string;
	toggleSubCategory: UseMutationResult<ApiResponse, Error, string>;
}) {
	const { data: subs = [], isLoading } = useFetchSubCategories(categoryId);
	const [loadingId, setLoadingId] = useState<string | null>(null);

	if (isLoading) return <p className="sub-loading">Loading...</p>;
	if (!subs.length) return <p className="sub-empty">No Subcategories.</p>;

	return (
		<div className="sub-list">
			{subs.map((sub) => (
				<div
					key={sub._id}
					className="sub-row"
					style={{ cursor: "pointer" }}
				>
					<img
						src={sub.image || "/placeholder.png"}
						className="sub-img"
					/>

					<div className="category-info">
						<span className="category-title">
							{sub.title}
						</span>
						<span className="category-key">
							Key: {sub.key}
						</span>
					</div>

					<button
						className={`status-btn ${
							sub.isActive ? "active" : "inactive"
						}`}
						onClick={(e) => {
							e.stopPropagation();
							setLoadingId(sub._id);
							toggleSubCategory.mutate(sub._id, {
								onSettled: () => setLoadingId(null),
							});
						}}
					>
						{loadingId === sub._id ? (
							<span className="loader"></span>
						) : sub.isActive ? (
							"Active"
						) : (
							"Inactive"
						)}
					</button>
				</div>
			))}
		</div>
	);
}
