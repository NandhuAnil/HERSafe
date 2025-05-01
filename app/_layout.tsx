import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setTimeout(() => {
          if (token) {
            router.replace("/(tabs)");
          } else {
            router.replace("/(auth)");
          }
        }, 100);
      } catch (error) {
        console.error("Error checking token:", error);
      } finally {
        // setIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    checkToken();
  }, []);

  return (
    <>
      <Stack
        initialRouteName="(auth)"
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // tabBarActiveTintColor: Colors.primary,
          // tabBarInactiveTintColor: Colors.text,
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="chatbot" options={{ headerShown: false }} />
        <Stack.Screen name="sossetting" options={{ headerShown: true }} />
        <Stack.Screen name="gemini" options={{ headerShown: true, headerTitle: "Chat Assistant" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
