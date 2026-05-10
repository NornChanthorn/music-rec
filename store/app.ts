// stores/spotifyStore.ts
import { create } from "zustand"

type SpotifyState = {
	accessToken: string | null
	setAccessToken: (token: string | null) => void
}

export const useSpotifyStore = create<SpotifyState>((set) => ({
	accessToken: null,
	setAccessToken: (token) => set({ accessToken: token }),
}))