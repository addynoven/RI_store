import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import Rootlayout from "./components/layouts/Rootlayout";
import AllProduct from "./pages/AllProduct";
import AllLayout from "./components/layouts/AllLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./components/layouts/AuthLayout";
import Cart from "./pages/Cart";
import PrivateRoute from "./components/layouts/PrivateRoute";
import ShippingScreen from "./pages/ShippingScreen";
import PlaceOrder from "./pages/PlaceOrder";
import Paymentsuccess from "./pages/Paymentsuccess";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Rootlayout />}>
			<Route element={<AllLayout />}>
				<Route index element={<HomeScreen />} />
				<Route path="/products/" element={<AllProduct />} />
				<Route path="/product/:id" element={<ProductScreen />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="" element={<PrivateRoute />}>
					{/* <Route path="/profile" element={<Profile />} /> */}
					{/* <Route path="/shipping" element={<ShippingScreen />} /> */}
					{/* <Route path="/payment" element={<Payment />} /> */}
					<Route path="/placeorder" element={<PlaceOrder />} />
					<Route path="/paymentsuccess" element={<Paymentsuccess />} />
					{/* <Route path="/order/:id" element={<OrderScreen />} /> */}
				</Route>
			</Route>
			<Route path="" element={<AuthLayout />}>
				<Route index path="login" element={<Login />} />
				<Route path="signup" element={<Register />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);
