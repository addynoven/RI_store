import ProductCard from "../../custom-components/Product-Card";
import { useGetProductsQuery } from "@/slices/productApiSlice";
import Loader from "../../custom-components/Loader.jsx";
import Message from "../../custom-components/Message.jsx";
import HoverCard from "@/components/custom-components/Hover-card";
const BestSeller = () => {
	const { data: products, isLoading, error } = useGetProductsQuery();
	const Best_products =
		products && products.filter((product) => product.isBestSeller === true);
	const count = Math.min(4, products && Best_products.length);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error.Message || error.error}</Message>
			) : (
				<>
					<div>
						<h3 className="mb-3 text-2xl font-semibold">Our Best Sellers</h3>
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 items-center lg:gap-8">
							{Best_products.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
									category={"Best Seller"}
									productId={product._id}
								/>
							))}
							<HoverCard />
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default BestSeller;
