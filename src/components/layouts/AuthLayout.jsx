import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<div className="w-[100%] mt-1 flex justify-center items-center bg-[#fdfdfd]">
			<Outlet />
		</div>
	);
};

export default AuthLayout;
