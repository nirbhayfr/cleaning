import CreateCategory from "./category/CreateCategory";
import CategorySubCategoryCards from "./category/ToggleCategories";

function AdminCategoryPage() {
	return (
		<section>
			<h2 className="page-title">Manage Categories & Subcategories</h2>

			<CategorySubCategoryCards />
			<CreateCategory />
		</section>
	);
}

export default AdminCategoryPage;
