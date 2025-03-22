import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../main-components/Header";
import Footer from "../sub-components/footer/Main-footer";
import ScrollToTop from "../custom-components/ScrollToTop";

export default function AllLayout() {
	return (
		<>
			<ScrollToTop />
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
