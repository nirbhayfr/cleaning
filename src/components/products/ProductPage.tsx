import ProductCategory from "./ProductCategory";
import { topCategories } from "../../../data/data.ts";

function ProductPage() {
	return (
		<section>
			<ProductCategory
				title={topCategories[0].title}
				rating={4.5}
				bookings="1k+"
				services={topCategories[0].services!}
			/>
		</section>
	);
}

export default ProductPage;
