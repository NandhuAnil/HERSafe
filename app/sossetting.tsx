import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";

const SettingsPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSaveContact = async () => {
    if (!email || !phone) {
      ToastAndroid.show(
        "Please provide both email and phone number.",
        ToastAndroid.SHORT
      );
      return;
    }

    try {
      const response = await fetch(
        "https://appsail-50026188699.development.catalystappsail.in/api/add-contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, phone }),
        }
      );

      const data = await response.json();
      if (data.success) {
        ToastAndroid.show('Contact saved successfully', ToastAndroid.SHORT);
        setEmail("");
        setPhone("")
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save contact");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Your Family Members here...</Text>

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        cursorColor={Colors.primary}
        />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        placeholder="Enter phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
        cursorColor={Colors.primary}
      />

      <TouchableOpacity onPress={handleSaveContact} style={styles.button}>
        <Text style={styles.buttonText}>Save Contact</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center'
  },
  heading: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsPage;
