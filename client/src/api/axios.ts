import axios from "axios";

export const api = axios.create({
	baseURL: `${import.meta.env.NODE_ENV === "production" ? import.meta.env.VITE_BASE_URL_HOSTED : import.meta.env.VITE_BASE_URL}`,
	timeout: 100000,
	withCredentials: true,
});
