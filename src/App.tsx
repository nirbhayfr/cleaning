import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Homepage from "./components/home/Homepage";
import ProductLayout from "./components/products/ProductsLayout";
import ProductPage from "./components/products/ProductPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import CartPage from "./components/products/CartPage";
import Login from "./components/login/Login";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AppLayout />}>
						<Route index element={<Homepage />} />
						<Route path="/cart" element={<CartPage />} />
					</Route>

					<Route path="/products" element={<ProductLayout />}>
						<Route index element={<ProductPage />} />
					</Route>
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
