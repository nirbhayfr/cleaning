import { useState } from "react";
import {
	useCreateCategory,
	useCreateSubCategory,
	useFetchAllCategories,
} from "../../../hooks/useCategories";

export default function CreateCategory() {
	const [showCategoryForm, setShowCategoryForm] = useState(false);
	const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);

	// Form state
	const [categoryForm, setCategoryForm] = useState({
		title: "",
		key: "",
		image: "",
	});
	const [subCategoryForm, setSubCategoryForm] = useState({
		title: "",
		image: "",
		category: "",
		key: "",
	});

	// Hooks
	const { data: categories } = useFetchAllCategories();
	const createCategoryMutation = useCreateCategory();
	const createSubCategoryMutation = useCreateSubCategory();

	// Handlers
	const handleCategorySubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createCategoryMutation.mutate(categoryForm, {
			onSuccess: () => {
				setCategoryForm({ title: "", key: "", image: "" });
				setShowCategoryForm(false);
			},
		});
		console.log(categoryForm);
	};

	const handleSubCategorySubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createSubCategoryMutation.mutate(subCategoryForm, {
			onSuccess: () => {
				setSubCategoryForm({
					title: "",
					image: "",
					category: "",
					key: "",
				});
				setShowSubCategoryForm(false);
			},
		});

		console.log(subCategoryForm);
	};

	return (
		<div className="admin-category-tab">
			<div className="buttons">
				<button onClick={() => setShowCategoryForm(true)}>
					Create Category
				</button>
				<button onClick={() => setShowSubCategoryForm(true)}>
					Create SubCategory
				</button>
			</div>

			{/* CATEGORY FORM */}
			{showCategoryForm && (
				<form className="form" onSubmit={handleCategorySubmit}>
					<h3>Create Category</h3>

					<input
						type="text"
						placeholder="Title"
						value={categoryForm.title}
						onChange={(e) =>
							setCategoryForm({
								...categoryForm,
								title: e.target.value,
							})
						}
						required
					/>

					<input
						type="text"
						placeholder="Key"
						value={categoryForm.key}
						onChange={(e) =>
							setCategoryForm({
								...categoryForm,
								key: e.target.value,
							})
						}
						required
					/>

					<input
						type="text"
						placeholder="Image URL"
						value={categoryForm.image}
						onChange={(e) =>
							setCategoryForm({
								...categoryForm,
								image: e.target.value,
							})
						}
					/>

					<button
						type="submit"
						disabled={createCategoryMutation.isPending}
					>
						{createCategoryMutation.isPending ? (
							<span className="loader"></span>
						) : (
							"Create"
						)}
					</button>

					<button
						type="button"
						onClick={() => setShowCategoryForm(false)}
					>
						Cancel
					</button>
				</form>
			)}

			{/* SUBCATEGORY FORM */}
			{showSubCategoryForm && (
				<form className="form" onSubmit={handleSubCategorySubmit}>
					<h3>Create SubCategory</h3>

					<input
						type="text"
						placeholder="Title"
						value={subCategoryForm.title}
						onChange={(e) =>
							setSubCategoryForm({
								...subCategoryForm,
								title: e.target.value,
							})
						}
						required
					/>

					<input
						type="text"
						placeholder="Image URL"
						value={subCategoryForm.image}
						onChange={(e) =>
							setSubCategoryForm({
								...subCategoryForm,
								image: e.target.value,
							})
						}
					/>

					<input
						type="text"
						placeholder="Key"
						value={subCategoryForm.key}
						onChange={(e) =>
							setSubCategoryForm({
								...subCategoryForm,
								key: e.target.value,
							})
						}
						required
					/>

					<select
						value={subCategoryForm.category}
						onChange={(e) =>
							setSubCategoryForm({
								...subCategoryForm,
								category: e.target.value,
							})
						}
						required
					>
						<option value="">Select Category</option>
						{categories?.map((cat) => (
							<option key={cat._id} value={cat._id}>
								{cat.title}
							</option>
						))}
					</select>

					<button
						type="submit"
						disabled={createSubCategoryMutation.isPending}
					>
						{createSubCategoryMutation.isPending ? (
							<span className="loader" />
						) : (
							"Create"
						)}
					</button>

					<button
						type="button"
						onClick={() => setShowSubCategoryForm(false)}
					>
						Cancel
					</button>
				</form>
			)}
		</div>
	);
}
