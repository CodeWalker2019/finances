// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Expanse, IncomeSource } from '../types'

const JSON_SERVER_BASE_QUERY = 'http://localhost:3001'

const INCOME_SOURCE_TAG_TYPE = 'INCOME_SOURCE_TAG_TYPE' as const
const EXPANSE_TAG_TYPE = 'EXPANSE_TAG_TYPE' as const
const UNPLANNED_EXPANSE_TAG_TYPE = 'UNPLANNED_EXPANSE_TAG_TYPE' as const
const TAG_TYPES = [UNPLANNED_EXPANSE_TAG_TYPE, INCOME_SOURCE_TAG_TYPE, EXPANSE_TAG_TYPE]

const baseQuery = fetchBaseQuery({ baseUrl: JSON_SERVER_BASE_QUERY, prepareHeaders: (headers) => {
  headers.set('Accept', 'application/json');
  return headers;
} });

const jsonServerApi = createApi({
  reducerPath: 'jsonServerApi',
  tagTypes: TAG_TYPES,
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

    getExpanses: builder.query<Expanse[], void>({
      query: () => '/expanses',
      providesTags: [
        { type: EXPANSE_TAG_TYPE, id: 'LIST' },
      ]
    }),

    addExpanse: builder.mutation<void, Omit<Expanse, 'id'>>({
      query: (body) => ({
        url: '/expanses',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: EXPANSE_TAG_TYPE, id: 'LIST' },
      ],
    }),

    removeExpanse: builder.mutation({
      query: (id) => ({
        url: `/expanses/${id}`,
        method: 'DELETE',
      }),
            invalidatesTags: [
        { type: EXPANSE_TAG_TYPE, id: 'LIST' },
      ],
    }),

    updateExpanse: builder.mutation({
      query: (body) => ({
        url: `/expanses/${body.id}`,
        method: 'PUT',
        body
      }),
    invalidatesTags: [
        { type: EXPANSE_TAG_TYPE, id: 'LIST' },
      ],
    }),

    getUnplannedExpanses: builder.query<Expanse[], void>({
      query: () => '/unplanned-expanses',
      providesTags: [
        { type: UNPLANNED_EXPANSE_TAG_TYPE, id: 'LIST' },
      ]
    }),

    addUnplannedExpanse: builder.mutation<void, Omit<Expanse, 'id'>>({
      query: (body) => ({
        url: '/unplanned-expanses',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: UNPLANNED_EXPANSE_TAG_TYPE, id: 'LIST' },
      ],
    }),

    removeUnplannedExpanse: builder.mutation({
      query: (id) => ({
        url: `/unplanned-expanses/${id}`,
        method: 'DELETE',
      }),
            invalidatesTags: [
        { type: UNPLANNED_EXPANSE_TAG_TYPE, id: 'LIST' },
      ],
    }),

    updateUnplannedExpanse: builder.mutation({
      query: (body) => ({
        url: `/unplanned-expanses/${body.id}`,
        method: 'PUT',
        body
      }),
            invalidatesTags: [
        { type: UNPLANNED_EXPANSE_TAG_TYPE, id: 'LIST' },
      ],
    }),
  }),
})

export default jsonServerApi
