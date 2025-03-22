import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "./slices/ApiSlice";
import cartSliceReducer from "./slices/cartSlice";
import AuthsliceReducer from "./slices/Authslice";
const store = configureStore({
	reducer: {
		[ApiSlice.reducerPath]: ApiSlice.reducer,
		cart: cartSliceReducer,
		auth: AuthsliceReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(ApiSlice.middleware),
	devTools: true,
});
export default store;
