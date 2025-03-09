import { ImageBackground, StyleSheet, Image, View, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/Button";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../../assets/items/dot.png")}
      resizeMode="repeat"
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/items/logo.png")}
          style={styles.image}
        />
        <Text style={styles.header}>Welcome to HERSafe</Text>
        <Text style={styles.text}>
          A starter app template for React Native Expo, featuring a ready-to-use
          login screen.
        </Text>
        <CustomButton
          title="Log in"
          onPress={() => router.push("/login")}
          mode="outlined"
          />
        <CustomButton
          title="Create an account"
          onPress={() => router.push("/signup")}
          mode="contained"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  header: {
    fontSize: 21,
    color: Colors.light.primary,
    fontWeight: "bold",
    paddingVertical: 12,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 12,
  }
});
