import React from "react";
import { Link } from "react-router-dom";

const StepItem = ({ value, label, link }) => {
	console.log(value, label, link);
	return (
		<>
			<li
				className={`flex items-center  after:mx-6 after:h-1 after:w-full after:border-b ${
					value
						? "text-primary-700 dark:text-primary-500"
						: "text-gray-500 dark:text-gray-400"
				}  after:border-gray-700`}
			>
				<span className="flex items-center after:mx-2 after:text-gray-500">
					<svg
						className="me-2 h-4 w-4 sm:h-5 sm:w-5"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						width={24}
						height={24}
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
					{value ? <Link to={link}>{label}</Link> : <span>{label}</span>}
				</span>
			</li>
		</>
	);
};

export default StepItem;
