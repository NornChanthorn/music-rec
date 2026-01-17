
import { SafeAreaView } from "react-native-safe-area-context"
import { Avatar, Text, YStack } from "tamagui"

export default function HomeScreen() {

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <YStack flex={1} alignItems="center" justifyContent="center">
        <Text fontSize={20} margin={20} fontWeight="bold">Welcome back sis! 🚀</Text>
        <Avatar circular size="$10" >
          <Avatar.Image
            accessibilityLabel="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
      </YStack>
    </SafeAreaView>
  )
}
