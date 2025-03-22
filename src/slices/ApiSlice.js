import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../constants.js";

const baseQuery = fetchBaseQuery({
	baseUrl: BASEURL,
});

export const ApiSlice = createApi({
	baseQuery: baseQuery,
	tagTypes: ["Products", "Orders", "Users"],
	endpoints: (builder) => ({}),
});
