import { apiSlice } from "../../app/api/apiSlice"

export const regionAnatomiquesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRegionAnatomiques: builder.query({
            query: () => '/RegionAnatomiques',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetRegionAnatomiquesQuery
} = regionAnatomiquesApiSlice 