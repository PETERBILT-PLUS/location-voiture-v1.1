import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        google: builder.mutation({
            query: (body) => ({
                url: "/google",
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateUser: builder.mutation({
            query: (body) => ({
                url: "/update-user",
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        addCar: builder.mutation({
            query: (body) => ({
                url: "/add-car",
                method: "POST",
                body: body,
            }),
        }),
        getCars: builder.query({
            query: () => "/get-cars",
        }),
        getCar: builder.mutation({
            query: (body) => ({
                url: "/get-car",
                method: "POST",
                body: body,
            }),
        }),
        // for the admin

        admin: builder.mutation({
            query: (body) => ({
                url: "/admin",
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        listings: builder.mutation({
            query: (body) => ({
                url: "/admin/create-listing",
                method: "POST",
                body: body,
            }),
        }),
        getListings: builder.mutation({
            query: (body) => ({
                url: "/admin/listing",
                method: "POST",
                body: body,
            }),
        }),
        deleteItem: builder.mutation({
            query: (body) => ({
                url: "/admin/deleteItem",
                method: "DELETE",
                body: body,
            }),
        }),
        changeAgenceDetail: builder.mutation({
            query: (body) => ({
                url: "/admin/agence-detail",
                method: "POST",
                body: body,
            }),
        }),
        changeListing: builder.mutation({
            query: (body) => ({
                url: "/admin/change-listing",
                method: "POST",
                body: body,
            }),
        }),
        getSingleListing: builder.mutation({
            query: (body) => ({
                url: "/admin/get-single-listing",
                method: "POST",
                body: body,
            }),
        }),
        headerContent: builder.query({
            query: () => "/header-content",
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGoogleMutation,
    useUpdateUserMutation,
    useAddCarMutation,
    useGetCarsQuery,
    useGetCarMutation,
    useAdminMutation,
    useListingsMutation,
    useGetListingsMutation,
    useDeleteItemMutation,
    useChangeAgenceDetailMutation,
    useChangeListingMutation,
    useGetSingleListingMutation,
    useHeaderContentQuery, 
} = api;