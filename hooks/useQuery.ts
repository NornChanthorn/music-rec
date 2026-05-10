
import { api } from "@/services/api"
import { useSpotifyStore } from "@/store/app"
import { type QueryKey, useQuery } from "@tanstack/react-query"

export function useFetch(key: QueryKey, url: string, params = {}) {
	const { accessToken } = useSpotifyStore()
	return useQuery({
		queryKey: key,
		enabled: !!accessToken,
		queryFn: async () => {
			const res = await api.get(url, { params })
			return res.data
		},
	})
}