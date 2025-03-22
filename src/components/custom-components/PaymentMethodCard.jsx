const PaymentMethodCard = ({ id, label, description, onClick }) => {
	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
			<div className="flex items-start">
				<div className="flex h-5 items-center">
					<input
						id={id}
						aria-describedby={`${id}-text`}
						onClick={onClick}
						type="radio"
						name="payment-method"
						className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
					/>
				</div>
				<div className="ms-4 text-sm">
					<label
						htmlFor={id}
						className="font-medium leading-none text-gray-900 dark:text-white"
					>
						{label}
					</label>
					<p
						id={`${id}-text`}
						className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
					>
						{description}
					</p>
				</div>
			</div>
		</div>
	);
};

export default PaymentMethodCard;
