import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Homepage from "./components/home/Homepage";
import ProductLayout from "./components/products/ProductsLayout";
import ProductPage from "./components/products/ProductPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import CartPage from "./components/cart/CartPage";
import Login from "./components/login/Login";
import CheckoutPage from "./components/checkout/CheckoutPage";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AppLayout />}>
						<Route index element={<Homepage />} />
					</Route>

					<Route path="/products" element={<ProductLayout />}>
						<Route index element={<ProductPage />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/checkout" element={<CheckoutPage />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
