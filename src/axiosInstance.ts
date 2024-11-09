import axios from "axios";

const MONO_BASE_URL = 'https://api.monobank.ua'

export const monoInstance = axios.create({
  baseURL: MONO_BASE_URL
});
