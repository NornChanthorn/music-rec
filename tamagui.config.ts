/* eslint-disable @typescript-eslint/no-empty-object-type */

import { createTamagui } from "tamagui"
import { themes, tokens } from "@tamagui/themes"

// Define your app config
export const config = createTamagui({
  themes,
  tokens,
  fonts: {
    body: {
      family: "System",
      size: {
        4: 16,
      },
      lineHeight: {
        4: 20,
      },
      weight: {
        4: "400",
      },
      letterSpacing: {
        4: 0,
      },
    },
  },
})

// Export type for Tamagui
export type AppConfig = typeof config

// Tell Tamagui about our config (module augmentation)
declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}
