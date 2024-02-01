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
    getLookups: builder.query<any, void>({
      query: (id) => `lookups`,
    }),
    getElementLookups: builder.query<any, void>({
      query: (id) => `lookups/${id}`,
    }),
    getElementLookupsCategoryAndValue: builder.query<
      any,
      { lookupId: string; lookupValueId: string }
    >({
      query: ({ lookupId, lookupValueId }) =>
        `lookups/${lookupId}/lookupvalues/${lookupValueId}`,
    }),
    getElementLinks: builder.query<any, any>({
      query: (id) => `elements/${id}/elementlinks`,
    }),
    getSubOrganization: builder.query<any, any>({
      query: (id) => `suborganizations/${id}`,
    }),
    getDepartment: builder.query<any, any>({
      query: ({ suborganizationId, id }) =>
        `suborganizations/${suborganizationId}/departments/${id}`,
    }),
    postElement: builder.mutation<any, any>({
      query: (elementData) => ({
        url: 'elements',
        method: 'POST',
        body: elementData,
      }),
    }),
  }),
});

export const {
  useGetElementsQuery,
  useGetElementLookupsCategoryAndValueQuery,
  useGetElementLookupsQuery,
  useGetElementLinksQuery,
  useGetDepartmentQuery,
  useGetSubOrganizationQuery,
  usePostElementMutation,
  useGetLookupsQuery,
} = elementApi;
