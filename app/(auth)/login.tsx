import {
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/Button";

export default function login() {
  const router = useRouter();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
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
        <Text style={styles.header}>Hello.</Text>
        {/* <Text style={styles.text}>
          A starter app template for React Native Expo, featuring a ready-to-use
          login screen.
        </Text> */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity onPress={() => router.push("/forgotPassword")}>
            <Text style={styles.forgot}>Forgot your password ?</Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          title="Log in"
          onPress={() => router.push("/login")}
          mode="outlined"
        />
        <View style={styles.row}>
          <Text>You do not have an account yet ?</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.link}>Create !</Text>
          </TouchableOpacity>
        </View>
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
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: Colors.light.secondary,
  },
  link: {
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
