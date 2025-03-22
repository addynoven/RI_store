import { PRODUCTS_URL } from "../constants";
import { ApiSlice } from "./ApiSlice";
export const productApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}`,
                method: "GET",
            }),
            keepUnusedDataFor: 60,
        }),
        getProductsbyId: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: "GET",
            }),
        }),
        keepUnusedDataFor: 60,
    }),
});

export const { useGetProductsQuery, useGetProductsbyIdQuery } = productApiSlice;
