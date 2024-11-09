// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IncomeSource } from '../types'

const JSON_SERVER_BASE_QUERY = 'http://localhost:3001'

const INCOME_SOURCE_TAG_TYPE = 'INCOME_SOURCE_TAG_TYPE' as const

const baseQuery = fetchBaseQuery({ baseUrl: JSON_SERVER_BASE_QUERY, prepareHeaders: (headers) => {
  headers.set('Accept', 'application/json');
  return headers;
} });

const jsonServerApi = createApi({
  reducerPath: 'jsonServerApi',
  tagTypes: [INCOME_SOURCE_TAG_TYPE],
  baseQuery,
  endpoints: (builder) => ({
    getIncomeSources: builder.query<IncomeSource[], void>({
      query: () => '/incomeSources',
      providesTags: [{ type: INCOME_SOURCE_TAG_TYPE, id: 'LIST' }]
    }),

    addIncomeSource: builder.mutation<void, Omit<IncomeSource, 'id'>>({
      query: (body) => ({
        url: '/incomeSources',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: INCOME_SOURCE_TAG_TYPE, id: 'LIST' }],
    }),

    removeIncomeSource: builder.mutation({
      query: (id) => ({
        url: `/incomeSources/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: INCOME_SOURCE_TAG_TYPE, id: 'LIST' }],
    }),

    updateIncomeSource: builder.mutation({
      query: (body) => ({
        url: `/incomeSources/${body.id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: INCOME_SOURCE_TAG_TYPE, id: 'LIST' }],
    }),
  }),
})

export default jsonServerApi
