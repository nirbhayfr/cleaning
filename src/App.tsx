import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Homepage from "./components/home/Homepage";
import ProductLayout from "./components/products/ProductsLayout";
import ProductPage from "./components/products/ProductPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<Homepage />} />
				</Route>

				<Route path="/products" element={<ProductLayout />}>
					<Route index element={<ProductPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
