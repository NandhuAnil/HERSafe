import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgotPassword" />
      <Stack.Screen name="verifyOtp" />
      <Stack.Screen name="newPassword" />
    </Stack>
  );
}
