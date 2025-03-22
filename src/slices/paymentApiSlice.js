import { PAYMENTS_URL } from "../constants";
import { ApiSlice } from "./ApiSlice";

export const paymentApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkout: builder.mutation({
            query: (amount) => ({
                url: `${PAYMENTS_URL}/checkout`,
                method: "POST",
                body: { amount },
            }),
        }),
        verifyPayment: builder.mutation({
            query: (orderId) => ({
                url: `${PAYMENTS_URL}/verify`,
                method: "POST",
                body: { orderId },
            }),
        }),
    }),
});

export const { useCheckoutMutation, useVerifyPaymentMutation } =
    paymentApiSlice;
