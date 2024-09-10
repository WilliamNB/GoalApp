import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
//import {setItem} from "@utils/AsyncStorage";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goal } from "@/classes/Goal";
import { Milestone } from "@/classes/Milestone";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // const milestone1: Milestone = {
  //   milestone: "decide tech stack",
  //   completed: false,
  // };
  // const milestone2: Milestone = { milestone: "create mvp", completed: false };

  // const goal1: Goal = {
  //   goal: "Create this app",
  //   milestones: [milestone1, milestone2],
  //   date: new Date(2024, 6, 6),
  //   reward: "Launch Party",
  //   completed: false,
  // };

  // await AsyncStorage.setItem("test", "test2");

  return (
    //<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
    //</ThemeProvider>
  );
}
