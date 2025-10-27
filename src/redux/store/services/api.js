import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `/users/${id}`,
            providesTags: (result, error, id) => [{ type: "User", id }],
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useGetUserQuery, useLoginMutation } = api;
