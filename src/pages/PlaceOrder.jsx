import InputField from "@/components/custom-components/InputComponent";
import PaymentMethodCard from "@/components/custom-components/PaymentMethodCard";
import { saveShippingAddress } from "@/slices/cartSlice";
import { useCheckoutMutation } from "@/slices/paymentApiSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const { shippingAddress, itemsPrice, shippingPrice, taxPrice, totalPrice } =
        useSelector((state) => state.cart);
    const [checkout] = useCheckoutMutation();
    const [name, setName] = useState(userInfo.name);
    const [email, setMail] = useState(userInfo.email);
    const [address, setAddress] = useState(shippingAddress?.address || "");
    const [city, setCity] = useState(shippingAddress?.city || "");
    const [postalCode, setPostalCode] = useState(
        shippingAddress?.postalCode || ""
    );
    const [country, setCountry] = useState(shippingAddress?.country || "");
    const [phone, setPhone] = useState(shippingAddress?.phone || "");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // State for payment method

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Address:", address, city, postalCode, country);
        console.log("Selected Payment Method:", selectedPaymentMethod); // Log selected payment method
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        try {
            const { order } = await checkout(totalPrice).unwrap();
            console.log(order, "line 33");
            console.log(import.meta.env.VITE_RAZORPAY_KEY_ID, "line 35");

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Make sure to use VITE_ prefix
                amount: "50000", // Amount is in currency subunits (paise for INR)
                currency: "INR",
                name: "Abostrogos",
                description: "Test Transaction",
                image: "https://www.giantbomb.com/a/uploads/scale_medium/1/14741/1796962-1614269_abstergo_industries_logo_by_milanvend_large.png",
                order_id: order.id, // Order ID from the backend
                callback_url:
                    "http://localhost:5000/api/payments/paymentverification",
                prefill: {
                    name: userInfo.name,
                    email: userInfo.email,
                    contact: phone,
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.log(error, "line 62"); // Log the error if any
        }
    };

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <form
                onSubmit={submitHandler}
                className="mx-auto max-w-screen-xl px-4 2xl:px-0"
            >
                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Shipping Address
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <InputField
                                    label="Name"
                                    type="text"
                                    name="Name"
                                    placeholder="Enter your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required={true}
                                />
                                <InputField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setMail(e.target.value)}
                                    required={true}
                                />
                                <InputField
                                    label="Address"
                                    type="text"
                                    name="address"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <InputField
                                    label="City"
                                    type="text"
                                    name="city"
                                    placeholder="Enter your city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <InputField
                                    label="Postal Code"
                                    type="text"
                                    name="postalCode"
                                    placeholder="Enter your postal code"
                                    value={postalCode}
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                />
                                <InputField
                                    label="Country"
                                    type="text"
                                    name="country"
                                    placeholder="Enter your country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                                <InputField
                                    label="phone"
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your phone number..."
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Payment
                            </h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {/* <PaymentMethodCard
									id="cod"
									label="Cash on delivery"
									description="Pay with cash upon receiving your order."
									onClick={() => setSelectedPaymentMethod("cod")} // Handle click
								/>
								<PaymentMethodCard
									id="credit-card"
									label="Credit Card"
									description="Pay with your credit card securely."
									onClick={() => setSelectedPaymentMethod("credit-card")}
								/>
								<PaymentMethodCard
									id="debit-card"
									label="Debit Card"
									description="Pay using your debit card."
									onClick={() => setSelectedPaymentMethod("debit-card")}
								/>
								<PaymentMethodCard
									id="netbanking"
									label="Netbanking"
									description="Use internet banking for payment."
									onClick={() => setSelectedPaymentMethod("netbanking")}
								/> */}
                                <PaymentMethodCard
                                    id="upi"
                                    label="UPI Payments"
                                    description="Pay instantly using UPI."
                                    onClick={() =>
                                        setSelectedPaymentMethod("upi")
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 ">
                        <div className="flow-root">
                            <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                <dl className="flex items-center justify-between gap-4 py-3 m-0">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                        Subtotal
                                    </dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                                        ₹{Number(itemsPrice).toFixed(2)}
                                    </dd>
                                </dl>
                                <dl className="flex items-center justify-between gap-4 py-3  m-0">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                        Shipping Price
                                    </dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                                        ₹{shippingPrice}
                                    </dd>
                                </dl>
                                <dl className="flex items-center justify-between gap-4 py-3  m-0">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                        Tax
                                    </dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                                        ₹{taxPrice}
                                    </dd>
                                </dl>
                                <dl className="flex items-center justify-between gap-4 py-3  m-0">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                                        Total
                                    </dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                                        ₹{totalPrice}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <button
                                type="submit"
                                className="flex w-full mb-1 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default PlaceOrder;
