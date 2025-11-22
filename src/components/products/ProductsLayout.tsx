import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Menubar from "../Menubar";
import ProductsHeader from "./layout/ProductsHeader";
import SearchInput from "../Search";

function ProductLayout() {
	return (
		<main className="products">
			<ProductsHeader />
			<SearchInput />
			<Menubar />
			<Outlet />
			<Footer />
		</main>
	);
}

export default ProductLayout;
