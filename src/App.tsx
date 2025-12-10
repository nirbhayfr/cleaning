import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Homepage from "./components/home/Homepage";
import ProductLayout from "./components/products/ProductsLayout";
import ProductPage from "./components/products/ProductPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import CartPage from "./components/cart/CartPage";
import Login from "./components/login/Login";
import CheckoutPage from "./components/checkout/CheckoutPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminLayout from "./components/admin/AdminLayout";
import AdminHomepage from "./components/admin/AdminHomepage";
import AdminCategoryPage from "./components/admin/AdminCategoryPage";
import AdminProductPage from "./components/admin/AdminProductPage";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<AppLayout />}>
							<Route index element={<Homepage />} />
						</Route>

						<Route
							path="/products"
							element={<ProductLayout />}
						>
							<Route index element={<ProductPage />} />
						</Route>
						<Route path="/login" element={<Login />} />
						<Route path="/cart" element={<CartPage />} />
						<Route
							path="/checkout"
							element={<CheckoutPage />}
						/>

						<Route path="/admin" element={<AdminLayout />}>
							<Route
								index
								element={
									<Navigate
										to="/admin/home"
										replace
									/>
								}
							/>
							<Route
								path="home"
								element={<AdminHomepage />}
							/>
							<Route
								path="category"
								element={<AdminCategoryPage />}
							/>
							<Route
								path="products"
								element={<AdminProductPage />}
							/>
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</QueryClientProvider>
	);
}

export default App;
