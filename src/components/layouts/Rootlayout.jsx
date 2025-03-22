import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Rootlayout() {
	return (
		<>
			<div className="mx-8">
				<Outlet />
				<ToastContainer />
			</div>
		</>
	);
}
