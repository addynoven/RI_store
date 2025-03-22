import { Link } from "react-router-dom";

const HoverCard = () => {
	return (
		<>
			<Link
				to={"/products/"}
				className="group relative block h-64 sm:h-80 lg:h-96 no-underline"
			>
				<div
					className="flex h-full justify-center items-center h-full w-full bg-[#929292] rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 text-black hover:underline
"
				>
					<h2 className="text-3xl font-bold  ">All Products</h2>
				</div>
			</Link>
		</>
	);
};

export default HoverCard;
