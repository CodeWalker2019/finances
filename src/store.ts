import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import monobankApi from './api/monobank'
import jsonServerApi from './api/jsonServer'

const store = configureStore({
  reducer: {
    [monobankApi.reducerPath]: monobankApi.reducer,
    [jsonServerApi.reducerPath]: jsonServerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(monobankApi.middleware).concat(jsonServerApi.middleware),
})

setupListeners(store.dispatch)

export default store
