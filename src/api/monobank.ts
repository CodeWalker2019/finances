// Need to use the React-specific entry point to import createApi
import { BaseQueryApi, BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from '@reduxjs/toolkit/query/react'
import { Currency } from '../types'
import { USD_CURRENCY_CODE } from '../constants'
import { CollectionsOutlined } from '@mui/icons-material';
import { AxiosResponse } from 'axios';

const MONO_BASE_URL = 'https://api.monobank.ua'

const baseQuery = fetchBaseQuery({ baseUrl: MONO_BASE_URL, prepareHeaders: (headers) => {
  headers.set('Accept', 'application/json');
  return headers;
} });

type test = (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>>

const baseQueryWithRetry: test = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 429) {
    await new Promise(resolve => setTimeout(resolve, 50000));
    result = await baseQueryWithRetry(args, api, extraOptions) as QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>;
  }

  return result;
};

const monobankApi = createApi({
  reducerPath: 'monobankApi',
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    getUsdCurrency: builder.query<Currency, void>({
      query: () => '/bank/currency',
      transformResponse: (data: Currency[]) => {
        const usd = data?.find(c => c.currencyCodeA === USD_CURRENCY_CODE)
        if (!usd || !data) throw new Error("Couldn't load USD currency data")
        return usd
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          monobankApi.util.updateQueryData('getUsdCurrency', undefined, (draft) => {
            Object.assign(draft, _arg)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export default monobankApi
