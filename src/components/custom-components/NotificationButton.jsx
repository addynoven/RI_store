import React from "react";

const NotificationButton = ({ Icon, quantity }) => {
	return (
		<button
			type="button"
			className="relative inline-flex items-center p-2.5 text-sm font-medium text-[#000] bg-[#fff] rounded-lg hover:bg-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
		>
			<Icon className="w-5 h-5" aria-hidden="true" />
			<span className="sr-only">Notifications</span>
			<div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
				{quantity}
			</div>
		</button>
	);
};

export default NotificationButton;
