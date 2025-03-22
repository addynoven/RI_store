import Loader from "@/components/custom-components/Loader";
import Message from "@/components/custom-components/Message";
import { clearCart } from "@/slices/cartSlice";
import { useCreateOrderMutation } from "@/slices/orderApiSlice";
import { useVerifyPaymentMutation } from "@/slices/paymentApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Paymentsuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const reference = sp.get("reference");
    const cart = useSelector((state) => state.cart);

    const [createOrder] = useCreateOrderMutation();
    const [
        verifyPayment,
        { isLoading: verifyPaymentIsLoading, error: verifyPaymentError },
    ] = useVerifyPaymentMutation();

    const placeOrderHandler = async (PaymentData) => {
        console.log("Placing order");
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
                paidAmount: PaymentData.amount,
                razorpayId: PaymentData.Id,
                updatedAt: PaymentData.updatedAt,
            }).unwrap();

            dispatch(clearCart());
            console.log(res, "Order created successfully");
            return res; // Return the created order id or the entire object
        } catch (error) {
            toast.error(
                error?.data?.message || error.message || "Order creation failed"
            );
            console.error("Error creating order:", error);
            return null; // Return null in case of error
        }
    };

    const verifyPaymentHandler = async () => {
        let url = null;
        try {
            const { data: PaymentData } = await verifyPayment({
                reference,
            }).unwrap();
            console.log(PaymentData, "Payment verification response");
            const orderId = PaymentData?.order;
            if (!orderId) {
                const { data: orderRes } = await placeOrderHandler(PaymentData);
                console.log(orderRes, "Order placement response");
                if (!orderRes) throw new Error("Order placement failed");
                url = `/order/${orderRes}`;
            } else {
                url = `/order/${orderId}`;
            }
        } catch (error) {
            toast.error(
                error?.data?.message ||
                    error.message ||
                    "Payment verification failed"
            );
            console.error("Error in verifyPaymentHandler:", error);
        } finally {
            if (url) {
                setTimeout(() => {
                    navigate(url);
                }, 5000); // Delay navigation by 5 seconds
            }
        }
    };

    useEffect(() => {
        verifyPaymentHandler();
    }, []);

    return verifyPaymentIsLoading ? (
        <Loader />
    ) : verifyPaymentError ? (
        <Message variant="danger">{verifyPaymentError}</Message>
    ) : (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Payment Success</h1>
                <h3 className="mt-4">Thank you for your payment</h3>
                <h4 className="mt-4">Redirecting to your order page</h4>
            </div>
        </div>
    );
};

export default Paymentsuccess;
