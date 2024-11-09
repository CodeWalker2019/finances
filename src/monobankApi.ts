import { monoInstance } from "./axiosInstance";
import { Currency } from "./types";

const USD_CURRENCY_CODE = 840

export async function getUsdCurrency() {
  const currencies: Currency[] = await monoInstance.get('/bank/currency').then(({ data }) => data)
  const usd = currencies.find(c => c.currencyCodeA === USD_CURRENCY_CODE)
  return usd
}