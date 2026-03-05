import { useEffect, useMemo, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import * as AuthSession from "expo-auth-session"
import * as WebBrowser from "expo-web-browser"
import Constants from "expo-constants"
import { Button, ScrollView, Text, YStack } from "tamagui"

WebBrowser.maybeCompleteAuthSession()

const spotifyDiscovery = {
	authorizationEndpoint: "https://accounts.spotify.com/authorize",
	tokenEndpoint: "https://accounts.spotify.com/api/token"
}

type SpotifyPlaylist = {
	id: string
	name: string
	owner: { display_name?: string }
	tracks: { total: number }
}

export default function TabTwoScreen() {
	const [accessToken, setAccessToken] = useState<string | null>(null)
	const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID
	const isExpoGo =
		Constants.appOwnership === "expo" ||
		Constants.executionEnvironment === "storeClient"
	const redirectUri = useMemo(
		() => AuthSession.makeRedirectUri({ scheme: "musicrec", useProxy: isExpoGo }),
		[isExpoGo]
	)

	const [request, response, promptAsync] = AuthSession.useAuthRequest(
		{
			clientId: clientId ?? "",
			scopes: ["playlist-read-private", "playlist-read-collaborative"],
			redirectUri,
			usePKCE: true
		},
		spotifyDiscovery
	)

	useEffect(() => {
		if (!response || response.type !== "success") return
		if (!clientId || !request?.codeVerifier) {
			setError("Missing Spotify client ID or PKCE verifier.")
			return
		}

		const exchange = async () => {
			try {
				const token = await AuthSession.exchangeCodeAsync(
					{
						clientId,
						code: response.params.code,
						redirectUri,
						extraParams: { code_verifier: request.codeVerifier }
					},
					spotifyDiscovery
				)
				setAccessToken(token.accessToken)
				setError(null)
			} catch (err) {
				setError("Failed to complete Spotify login.")
			}
		}

		void exchange()
	}, [clientId, redirectUri, request?.codeVerifier, response])

	const fetchPlaylists = async () => {
		if (!accessToken) return
		setLoading(true)
		setError(null)
		try {
			const res = await fetch(
				"https://api.spotify.com/v1/me/playlists?limit=50",
				{
					headers: { Authorization: `Bearer ${accessToken}` }
				}
			)
			if (!res.ok) {
				throw new Error(`Spotify error: ${res.status}`)
			}
			const data = await res.json()
			setPlaylists(data.items ?? [])
		} catch (err) {
			setError("Failed to load playlists.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ padding: 16 }}>
				<YStack gap="$4">
					<Text fontSize={20} fontWeight="bold">
						Spotify Playlists
					</Text>
					<Text color="$gray10">
						Login with Spotify to read your playlists.
					</Text>
					{!clientId && (
						<Text color="$red10">
							Set EXPO_PUBLIC_SPOTIFY_CLIENT_ID to continue.
						</Text>
					)}
					<Button
						disabled={!request || !clientId}
						onPress={() => promptAsync({ useProxy: isExpoGo })}
					>
						Connect Spotify
					</Button>
					<Text fontSize={12} color="$gray10">
						Redirect URI: {redirectUri}
					</Text>
					<Button
						disabled={!accessToken || loading}
						onPress={fetchPlaylists}
					>
						{loading ? "Loading..." : "Load Playlists"}
					</Button>
					{error && <Text color="$red10">{error}</Text>}
					{playlists.length > 0 && (
						<YStack gap="$2">
							{playlists.map((playlist) => (
								<YStack
									key={playlist.id}
									padding="$3"
									borderWidth={1}
									borderColor="$gray6"
									borderRadius="$3"
								>
									<Text fontWeight="bold">{playlist.name}</Text>
									<Text color="$gray10">
										{playlist.tracks.total} tracks ·{" "}
										{playlist.owner.display_name ?? "Unknown owner"}
									</Text>
								</YStack>
							))}
						</YStack>
					)}
				</YStack>
			</ScrollView>
		</SafeAreaView>
	)
}
