import { Text, YStack } from "tamagui"
import { useFetch } from "@/hooks/useQuery"

export default function PlaylistScreen() {
	const {
		data: playList,
		isLoading,
		error,
	} = useFetch(["playlist"], "/v1/me/top/tracks")

	console.log("playList", playList)
	console.log("error", error)

	return (
		<YStack flex={1} alignItems="center" justifyContent="center" padding="$4">
			<Text>My PlayList</Text>

			{isLoading && <Text>Loading...</Text>}

			{error && <Text color="$red10">Failed to load playlist</Text>}

			{playList && (
				<Text>
					Total tracks: {playList.items?.length ?? 0}
				</Text>
			)}
		</YStack>
	)
}