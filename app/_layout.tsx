import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function Layout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ManropeBold: require('../assets/fonts/Manrope-Bold.ttf'),
    Manrope: require('../assets/fonts/Manrope-Regular.ttf'),
    ManropeMedium: require('../assets/fonts/Manrope-Medium.ttf'),
    ManropeSemiBold: require('../assets/fonts/Manrope-SemiBold.ttf'),
    ManropeLight: require('../assets/fonts/Manrope-Light.ttf'),
    ManropeExtraBold: require('../assets/fonts/Manrope-ExtraBold.ttf'),
    ManropeExtraLight: require('../assets/fonts/Manrope-ExtraLight.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen
        name='edit-student'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
