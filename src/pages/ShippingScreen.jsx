import InputField from "@/components/custom-components/InputComponent";
import { saveShippingAddress } from "@/slices/cartSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShippingScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { shippingAddress } = useSelector((state) => state.cart);

	const [address, setAddress] = useState(shippingAddress?.address || "");
	const [city, setCity] = useState(shippingAddress?.city || "");
	const [postalCode, setPostalCode] = useState(
		shippingAddress?.postalCode || ""
	);
	const [country, setCountry] = useState(shippingAddress?.country || "");

	const submitHandler = (e) => {
		console.log(address, city, postalCode, country);
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate("/placeorder");
	};

	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Shipping Address
							</h1>
							<form
								onSubmit={submitHandler}
								className="space-y-4 md:space-y-6"
								action="#"
							>
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
									onChange={(e) => setPostalCode(e.target.value)}
								/>
								<InputField
									label="Country"
									type="text"
									name="country"
									placeholder="Enter your country"
									value={country}
									onChange={(e) => setCountry(e.target.value)}
								/>
								<button
									type="submit"
									className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									Continue
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ShippingScreen;
