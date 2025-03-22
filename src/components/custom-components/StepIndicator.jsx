import StepItem from "./StepItem";
const StepIndicator = ({ step1, step2, step3 }) => {
	const steps = [
		{ Label: "Cart", link: "/cart", value: step1 },
		{ Label: "Checkout", link: "/placeorder", value: step2 },
		{ Label: "Order summary", link: "/cart", value: step3 },
	];

	return (
		<ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
			{steps.map((step, index) => (
				<StepItem
					key={index}
					value={step.value}
					label={step.Label}
					link={step.link}
				/>
			))}
		</ol>
	);
};

export default StepIndicator;
