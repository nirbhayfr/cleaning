import ProductCategory from "./ProductCategory";
import { services } from "../../../data/data.js";

function ProductPage() {
	return (
		<section>
			<ProductCategory
				title="Home Cleaning"
				rating={4.5}
				bookings="1k+"
				services={services}
			/>
		</section>
	);
}

export default ProductPage;
