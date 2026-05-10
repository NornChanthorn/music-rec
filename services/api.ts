import { useSpotifyStore } from "@/store/app"
import axios from "axios"

export const api = axios.create({
	baseURL:
		process.env.EXPO_PUBLIC_API_URL ??
		(() => {
			throw new Error("Missing API URL")
		})(),
	timeout: 10000,
	headers: {
		"Content-Type": "application/json"
	},
	withCredentials: false
})

api.interceptors.request.use(
	async (config) => {
		const accessToken = useSpotifyStore.getState().accessToken

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}

		console.log("🚀 Request:", {
			method: config.method,
			url: config.url,
			headers: config.headers,
			data: config.data,
			params: config.params
		})

		return config
	},
	(error) => Promise.reject(error)
)