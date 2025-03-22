import { Link } from "react-router-dom";
import Rating from "./Rating";
const ProductCard = ({ product, category, productId }) => {
	console.log(product);

	return (
		<>
			<section className="rounded-lg overflow-hidden border border-gray-100 bg-white ">
				<Link
					to={`/product/${productId}`}
					className=" text-gray-800 no-underline group relative block overflow-hidden"
				>
					<button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
						<span className="sr-only">Wishlist</span>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-4 w-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
							/>
						</svg>
					</button>

					<img
						src={product.image}
						alt=""
						className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
					/>

					<div className="relative p-6">
						<span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
							{category}
						</span>

						<h3 className="mt-4 text-lg font-medium text-gray-900">
							{product.name}
						</h3>

						<div className="flex justify-start items-start gap-2">
							<div>
								<p className="text-[#e20000] text-lg font-bold">
									₹{product.price - 10}
								</p>
							</div>
							<div>
								<p className="block text-[#000000c2] font-light line-through">
									₹{product.price}
								</p>
							</div>
							<Rating Values={product.rating} />
						</div>

						<form className="mt-4">
							<button className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
								Add to Cart
							</button>
						</form>
					</div>
				</Link>
			</section>
		</>
	);
};

export default ProductCard;
