import { ORDERS_URL } from "../constants";
import { ApiSlice } from "./ApiSlice";

export const orderApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: `${ORDERS_URL}`,
                method: "POST",
                body: { ...order },
            }),
        }),
        getOrderDetail: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                method: "GET",
            }),
            keepUnusedDataFor: 60,
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderDetailQuery } = orderApiSlice;
