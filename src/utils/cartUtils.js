export const addDecimals = (num) => {
	return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (state) => {
	//calculate items price
	state.itemsPrice = addDecimals(
		state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);

	//calculate shipping price
	state.shippingPrice = addDecimals(state.itemsPrice > 500 ? 0 : 10);

	//calculate tax price
	state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));

	//calculate total price
	state.totalPrice = addDecimals(
		state.itemsPrice + state.shippingPrice + state.taxPrice
	).toFixed(2);

	// Save the cart to localStorage
	localStorage.setItem("cart", JSON.stringify(state));

	return state;
};
