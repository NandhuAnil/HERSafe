import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const CustomButton: React.FC<{
  title: string;
  onPress: () => void;
  mode: string;
}> = ({ title, onPress, mode }) => {
  return (
    <Pressable
      style={[
        styles.button,
        mode === "outlined" && { backgroundColor: Colors.primary },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText,mode === "outlined" && { color: Colors.background },]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
    color: Colors.primary
  },
});

export default CustomButton;
