import { useEffect } from "react"
import { router } from "expo-router"
import { Text, YStack } from "tamagui"

export default function SpotifyCallbackScreen() {
	useEffect(() => {
		const timer = setTimeout(() => {
			router.replace("/playlist")
		}, 800)

		return () => clearTimeout(timer)
	}, [])

	return (
		<YStack flex={1} alignItems="center" justifyContent="center" padding="$4">
			<Text>Connecting Spotify...</Text>
		</YStack>
	)
}