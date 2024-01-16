import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const elementApi = createApi({
  reducerPath: 'elementApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://650af6bedfd73d1fab094cf7.mockapi.io/',
  }),
  endpoints: (builder) => ({
    getElements: builder.query<string, void>({
      query: () => `elements`,
    }),
    getElementLookups: builder.query<string, void>({
      query: (id) => `lookups/${id}`,
    }),
    getElementLookupsCategoryAndValue: builder.query<string, any>({
      query: ({ categoryId, categoryValueId }) =>
        `lookups/${categoryId}/lookupvalues/${categoryValueId}`,
    }),
  }),
});

export const { useGetElementsQuery } = elementApi;
