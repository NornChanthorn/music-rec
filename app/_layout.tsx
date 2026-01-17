import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import { useColorScheme } from "react-native"
import { TamaguiProvider, Theme, useTheme } from "tamagui"
import { config } from "../tamagui.config"

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme === "dark" ? "dark" : "light"}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <ThemeBasedThemeProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              statusBarStyle: colorScheme === "dark" ? "light" : "dark",
            }}
          />
        </ThemeBasedThemeProvider>
      </Theme>
    </TamaguiProvider>
  )
}

function ThemeBasedThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  const colorScheme = useColorScheme()

  const navigationTheme = {
    ...(colorScheme === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(colorScheme === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.background.get(),
      card: theme.background.get(),
      text: theme.color.get(),
      primary: theme.blue10?.get() || theme.color.get(),
      border: theme.borderColor?.get() || "transparent",
    },
  }

  return <ThemeProvider value={navigationTheme}>{children}</ThemeProvider>
}
