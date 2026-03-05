import api from "@/services/api"
import { type QueryKey, useQuery } from "@tanstack/react-query"

export function useFetch(
	key: QueryKey,
	url: string,
	params = {},
	enabled = true
) {
	const queryKey = key
	const queryFn = async () =>
		await api
			.get(url, { params })
			.then((res) => res.data)
			.catch((err) => {
				throw new Error("An error occurred while fetching data.", err)
			})
	return useQuery({ queryKey, queryFn, enabled })
}
