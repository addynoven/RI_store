import React, { useState } from "react";

const QuantitySelector = ({ qty, setQty, maxQty }) => {
	const [quantity, setQuantity] = useState(qty);

	const handleDecrement = () => {
		const newQty = quantity > 1 ? quantity - 1 : 1;
		setQuantity(newQty);
		setQtyHandler(newQty); // Pass the updated value directly
	};

	const handleIncrement = () => {
		const newQty = quantity < maxQty ? quantity + 1 : maxQty;
		setQuantity(newQty);
		setQtyHandler(newQty); // Pass the updated value directly
	};

	const handleChange = (e) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value)) {
			setQuantity(value);
			setQtyHandler(value); // Pass the updated value directly
		}
	};

	const setQtyHandler = (newQty) => {
		setQty(newQty);
	};

	return (
		<form className="">
			<label
				htmlFor="quantity-input"
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				Choose quantity:
			</label>
			<div className="relative flex items-center max-w-[8rem]">
				<button
					type="button"
					id="decrement-button"
					onClick={handleDecrement}
					className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
				>
					<svg
						className="w-3 h-3 text-gray-900 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 18 2"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 1h16"
						/>
					</svg>
				</button>
				<input
					type="text"
					id="quantity-input"
					value={quantity}
					onChange={handleChange}
					className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="999"
					required
				/>
				<button
					type="button"
					id="increment-button"
					onClick={handleIncrement}
					className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
				>
					<svg
						className="w-3 h-3 text-gray-900 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 18 18"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 1v16M1 9h16"
						/>
					</svg>
				</button>
			</div>
			<p
				id="helper-text-explanation"
				className="mt-2 text-sm text-gray-500 dark:text-gray-400"
			>
				Please select a quantity...
			</p>
		</form>
	);
};

export default QuantitySelector;
