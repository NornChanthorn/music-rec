import axios, { type AxiosResponse } from "axios"

const api = axios.create({
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
//Logs request
api.interceptors.request.use(
	async (config) => {
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

//Logs response
api.interceptors.response.use(
	(response: AxiosResponse) => {
		console.log("✅ Response:", {
			url: response.config.url,
			status: response.status,
			data: response.data
		})
		return response
	},
	async (error) => {
		console.log("❌ Response Error:", {
			url: error.config?.url,
			status: error.response?.status,
			message: error.message,
			data: error.response?.data
		})
		return Promise.reject(error)
	}
)

export default api
