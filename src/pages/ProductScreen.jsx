import Loader from "@/components/custom-components/Loader";
import Message from "@/components/custom-components/Message";
import ProductDetail from "@/components/custom-components/productDetail";
import { useGetProductsbyIdQuery } from "@/slices/productApiSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const ProductScreen = () => {
    const { id: productId } = useParams();
    const {
        data: product,
        isLoading,
        error,
    } = useGetProductsbyIdQuery(productId);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <ProductDetail product={product} />
            )}
        </>
    );
};

export default ProductScreen;
