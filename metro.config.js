import tamaguiMetroPlugin from "@tamagui/metro-plugin"
import { getDefaultConfig } from "@expo/metro-config"
import { fileURLToPath } from "url"
import { dirname } from "path"

const { withTamagui } = tamaguiMetroPlugin

// recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config = getDefaultConfig(__dirname)

export default withTamagui(config, {
  config: "./tamagui.config.ts",
})