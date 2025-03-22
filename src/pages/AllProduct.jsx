import HoverCard from "@/components/custom-components/Hover-card";
import Loader from "@/components/custom-components/Loader";
import Message from "@/components/custom-components/Message";
import ProductCard from "@/components/custom-components/Product-Card";
import { useGetProductsQuery } from "@/slices/productApiSlice";

const AllProduct = () => {
	const { data: products, isLoading, error } = useGetProductsQuery();
	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<div className=" my-3 py-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center lg:gap-8">
					{products.map((product) => (
						<ProductCard
							key={product._id}
							product={product}
							category={"Best Seller"}
							productId={product._id}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default AllProduct;
