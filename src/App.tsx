import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
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
import RegisterPage from "./components/login/Register";
import AdminOrdersPage from "./components/admin/AdminOrdersPage";
import MyOrders from "./components/orders/MyOrders";
import OrdersLayout from "./components/orders/OrderLayout";
import OrdersPage from "./components/orders/OrderPage";
import ProtectedRoute from "./ProtectedRoutes";
import ProfilePage from "./components/profile/ProfilePage";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<Toaster position="bottom-right" richColors />
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route
							path="/register"
							element={<RegisterPage />}
						/>

						<Route
							element={
								<ProtectedRoute
									allowedRoles={[
										"CUSTOMER",
										"VENDOR",
										"ADMIN",
									]}
								/>
							}
						>
							<Route path="/cart" element={<CartPage />} />
							<Route
								path="/profile"
								element={<ProfilePage />}
							/>
							<Route
								path="/checkout"
								element={<CheckoutPage />}
							/>
						</Route>

						<Route path="/" element={<AppLayout />}>
							<Route index element={<Homepage />} />
						</Route>

						<Route
							path="/products"
							element={<ProductLayout />}
						>
							<Route index element={<ProductPage />} />
						</Route>

						<Route
							path="/admin"
							element={
								<ProtectedRoute
									allowedRoles={["ADMIN"]}
								/>
							}
						>
							<Route element={<AdminLayout />}>
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
								<Route
									path="orders"
									element={<AdminOrdersPage />}
								/>
							</Route>
						</Route>

						<Route
							path="/orders"
							element={
								<ProtectedRoute
									allowedRoles={["VENDOR", "ADMIN"]}
								/>
							}
						>
							<Route element={<OrdersLayout />}>
								<Route index element={<OrdersPage />} />
								<Route
									path="myorders"
									element={<MyOrders />}
								/>
							</Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</QueryClientProvider>
	);
}

export default App;
