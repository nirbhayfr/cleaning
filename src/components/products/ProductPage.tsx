import ProductCategory from "./ProductCategory";
import { useSearchParams } from "react-router-dom";
import { useGetAllProducts } from "../../hooks/useProduct.ts";
import type { Product } from "../../api/product.ts";
import { useFetchAllCategories } from "../../hooks/useCategories.ts";

function ProductPage() {
	const [searchParams] = useSearchParams();

	const category = searchParams.get("category");
	const subCategory = searchParams.get("sub-category");
	const { data: products = [], isLoading } = useGetAllProducts();
	const { data: categories = [], isLoading: categoriesLoading } =
		useFetchAllCategories();
	if (isLoading || categoriesLoading) return <p>Loading...</p>;

	const filteredProducts = products.filter(
		(p: Product) =>
			p.category === category && p.subcategory === subCategory
	);

	const categoryData = categories.find((c) => c.key === category);

	return (
		<section>
			<ProductCategory
				title={categoryData!.title}
				rating={4.5}
				bookings="1k"
				services={filteredProducts}
				subCategories={
					categoryData!.subCategory.filter((c) => c.isActive) ??
					[]
				}
			/>
		</section>
	);
}

export default ProductPage;
