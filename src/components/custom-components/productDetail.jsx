import { useEffect, useState } from "react";
import Rating from "./Rating";
import ProductDescription from "./ProductDescription";
import QuantitySelector from "./QuantitySelector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "@/slices/cartSlice";

const ProductDetail = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [maxQty, setMaxQty] = useState(product.countInStock);
    const [mainImage, setMainImage] = useState(product.image);

    const changeImage = (src) => {
        setMainImage(src);
    };

    useEffect(() => {
        console.log(qty);
    }, [qty]);

    const addToCartHandler = () => {
        console.log(qty);
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
    };

    return (
        product && (
            <>
                <div className="bg-gray-100">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-wrap -mx-4">
                            {/* Product Images */}
                            <div className="w-full md:w-1/2 px-4 mb-8">
                                <img
                                    src={mainImage}
                                    alt="Product"
                                    className="w-full h-auto rounded-lg shadow-md mb-4"
                                    id="mainImage"
                                />
                                <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                                    {[
                                        "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080",
                                        "https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
                                        "https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
                                        "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
                                    ].map((src) => (
                                        <img
                                            key={src}
                                            src={src}
                                            alt="Thumbnail"
                                            className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                            onClick={() => changeImage(src)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="w-full md:w-1/2 px-4">
                                <h2 className="text-3xl font-bold mb-2">
                                    {product.name}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    {product.category}
                                </p>
                                <div className="mb-4">
                                    <span className="text-2xl font-bold mr-2">
                                        ₹{product.price - 10}
                                    </span>
                                    <span className="text-gray-500 line-through">
                                        ₹{product.price}
                                    </span>
                                </div>
                                <div className="flex items-center mb-4">
                                    <Rating Values={product.rating} />
                                    <span className=" text-gray-600">
                                        ({product.numReviews} reviews)
                                    </span>
                                </div>
                                <p className="text-gray-700 text-justify mb-5">
                                    <ProductDescription
                                        description={product.description}
                                    />
                                </p>

                                {/* <div className="mb-6">
							<h3 className="text-lg font-semibold mb-2">Color:</h3>
							<div className="flex space-x-2">
								<button className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
								<button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
								<button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
							</div>
						</div> */}

                                <div className="mb-6">
                                    <QuantitySelector
                                        qty={qty}
                                        setQty={setQty}
                                        maxQty={maxQty}
                                    />
                                </div>

                                <div className="flex space-x-4 mb-6">
                                    <button
                                        type="button"
                                        onClick={addToCartHandler}
                                        className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                            />
                                        </svg>
                                        Add to Cart
                                    </button>
                                    <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 8.25c0-2.485-1.79-4.5-4-4.5s-4 2.015-4 4.5m8 0h-8m8 0c0 2.018-1.344 4.326-3.5 6.035-1.171.862-2.32 1.466-3.082 1.715a.582.582 0 0 1-.336 0c-.762-.249-1.911-.853-3.082-1.715C6.344 12.576 5 10.268 5 8.25c0-2.485-1.79-4.5-4-4.5s-4 2.015-4 4.5m8 0H5"
                                            />
                                        </svg>
                                        Buy Now
                                    </button>
                                </div>

                                <div className="flex items-center space-x-2 mb-6">
                                    <span className="text-gray-600">
                                        Share:
                                    </span>
                                    <button className="text-gray-500 hover:text-indigo-600">
                                        <svg
                                            className="size-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.11 3.11 0 0 0 0-.81l7.13-4.11c.52.48 1.21.77 1.96.77 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .16.01.31.04.46L8.91 8.91c-.52-.48-1.21-.77-1.96-.77-1.66 0-3 1.34-3 3s1.34 3 3 3c.76 0 1.44-.3 1.96-.77l7.13 4.11c-.03.15-.04.3-.04.46 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z" />
                                        </svg>
                                    </button>
                                    <button className="text-gray-500 hover:text-indigo-600">
                                        <svg
                                            className="size-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.92 11.66a8.3 8.3 0 0 0-.36-2.65 7.65 7.65 0 0 0-.99-2.23 7.25 7.25 0 0 0-1.38-1.77 7.15 7.15 0 0 0-1.77-1.38 7.65 7.65 0 0 0-2.23-.99 8.3 8.3 0 0 0-2.65-.36h-.33a8.29 8.29 0 0 0-2.65.36 7.65 7.65 0 0 0-2.23.99 7.25 7.25 0 0 0-1.77 1.38 7.15 7.15 0 0 0-1.38 1.77 7.65 7.65 0 0 0-.99 2.23 8.3 8.3 0 0 0-.36 2.65v.33a8.29 8.29 0 0 0 .36 2.65 7.65 7.65 0 0 0 .99 2.23 7.25 7.25 0 0 0 1.38 1.77 7.15 7.15 0 0 0 1.77 1.38 7.65 7.65 0 0 0 2.23.99 8.3 8.3 0 0 0 2.65.36h.33a8.29 8.29 0 0 0 2.65-.36 7.65 7.65 0 0 0 2.23-.99 7.25 7.25 0 0 0 1.77-1.38 7.15 7.15 0 0 0 1.38-1.77 7.65 7.65 0 0 0 .99-2.23 8.3 8.3 0 0 0 .36-2.65v-.33zm-7.17 3.66h-.33c-.74 0-1.44-.17-2.1-.51a3.88 3.88 0 0 1-1.61-1.62 4.43 4.43 0 0 1-.5-2.1v-.34c0-.73.17-1.43.5-2.1.38-.65.89-1.17 1.61-1.62a4.32 4.32 0 0 1 2.1-.51h.33c.74 0 1.44.17 2.1.51.65.38 1.17.89 1.61 1.62.33.67.5 1.37.5 2.1v.34c0 .73-.17 1.43-.5 2.1a4.32 4.32 0 0 1-1.61 1.62c-.66.33-1.36.5-2.1.5z" />
                                        </svg>
                                    </button>
                                    <button className="text-gray-500 hover:text-indigo-600">
                                        <svg
                                            className="size-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2.04c-5.46 0-9.89 4.43-9.89 9.89 0 4.59 3.17 8.38 7.38 9.72.55.1.74-.24.74-.52v-1.78c-3.01.65-3.65-1.48-3.65-1.48-.48-1.22-1.18-1.54-1.18-1.54-.96-.65.07-.64.07-.64 1.06.08 1.62 1.09 1.62 1.09.95 1.62 2.5 1.15 3.11.88.1-.69.37-1.15.66-1.42-2.4-.27-4.94-1.2-4.94-5.3 0-1.17.42-2.13 1.1-2.88-.11-.27-.47-1.36.1-2.84 0 0 .9-.29 2.95 1.1a10.24 10.24 0 0 1 2.68-.36c.91 0 1.82.12 2.68.36 2.05-1.39 2.95-1.1 2.95-1.1.57 1.48.21 2.57.1 2.84.68.75 1.1 1.71 1.1 2.88 0 4.12-2.55 5.03-4.98 5.3.38.33.7 1 .7 2.02v3c0 .28.2.63.74.52 4.22-1.33 7.38-5.12 7.38-9.72 0-5.46-4.43-9.89-9.89-9.89z" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="border-t pt-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Product Details:
                                    </h3>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li>High-fidelity sound</li>
                                        <li>
                                            Advanced noise-cancellation
                                            technology
                                        </li>
                                        <li>
                                            Long battery life (up to 30 hours)
                                        </li>
                                        <li>Comfortable over-ear design</li>
                                        <li>Bluetooth 5.0 connectivity</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default ProductDetail;
