import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ToastAndroid } from 'react-native';

const SettingsPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const handleSaveContact = async () => {
    if (!email || !phone) {
      ToastAndroid.show('Please provide both email and phone number.', ToastAndroid.SHORT);
      return;
    }

    try {
      const response = await fetch('https://appsail-50026188699.development.catalystappsail.in/api/add-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone }),
      });
      
      const data = await response.json();
      if (data.success) {
        Alert.alert('Contact saved successfully');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save contact');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Add Contact</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderColor: 'gray',
        }}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderColor: 'gray',
        }}
      />
      <Button title="Save Contact" onPress={handleSaveContact} />
    </View>
  );
};

export default SettingsPage;
