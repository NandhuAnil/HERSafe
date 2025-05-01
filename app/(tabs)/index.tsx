import { Colors } from '@/constants/Colors';
import useUser from '@/hooks/useUser';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
const { width, height } = Dimensions.get('window');
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import Wave from '@/scripts/wave';

const user = {
  imageUrl: "",
  fullName: "Dora",
};

type Location = {
  latitude: number;
  longitude: number;
};

type Contact = {
  email: string;
  phone: string;
};

export default function HomeScreen() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [message, setMessage] = useState<string>('I am in danger, please help!');
  const [loading, setLoading] = useState<boolean>(false);
  const photoURL = "";
  const { currentUser } = useUser();
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateAvatarUrl = (name: string) => {
    const firstLetter = name.charAt(0);
    const backgroundColor = getRandomColor();
    const imageSize = 130;
    return `https://ui-avatars.com/api/?background=${backgroundColor}&size=${imageSize}&color=FFF&font-size=0.60&name=${firstLetter}`;
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://appsail-50026188699.development.catalystappsail.in/api/contacts');
        const data = await response.json();
        if (data.success) {
          setContacts(data.contacts);
        } else {
          ToastAndroid.show('Failed to load contacts', ToastAndroid.SHORT);
        }
      } catch (error) {
        ToastAndroid.show('Failed to fetch contacts', ToastAndroid.SHORT);
      }
    };

    fetchContacts();

    // Get location using Expo's Location API
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // Request permission
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);  // Set the location coordinates
    };

    getLocation();
  }, []);

  const handleSendSOS = async () => {
    if (!contacts.length || !location) {
      ToastAndroid.show('No contacts or location available', ToastAndroid.SHORT);
      return;
    }

    const payload = {
      contacts,
      message,
      location: `${location.latitude}, ${location.longitude}`,
    };

    setLoading(true);

    try {
      const response = await fetch('https://appsail-50026188699.development.catalystappsail.in/api/sos/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setLoading(false);
        Alert.alert('Error', `Server returned an error: ${response.status}. Check logs for details.`);
        return;
      }
      const text = await response.text();
      console.log('Raw response:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (error: any) {
        console.log('Error parsing response as JSON:', error.message);
        setLoading(false);
        ToastAndroid.show('Failed to parse server response', ToastAndroid.SHORT);
        return;
      }
      setLoading(false);
      if (data.success) {
        ToastAndroid.show('SOS sent successfully', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error sending SOS alert', data.message || 'Unknown error');
      }
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Error', 'An unexpected error occurred while sending SOS alert');
    }
  };
  const confirmAndSendSOS = () => {
    Alert.alert(
      'Confirm SOS',
      'Are you sure you want to send an SOS alert to your contacts?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          style: 'destructive',
          onPress: handleSendSOS,
        },
      ],
      { cancelable: true }
    );
  };
  

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: Colors.primary,
            padding: 20,
            paddingTop: "15%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 17,
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
                <Image
                  source={
                    photoURL
                      ? { uri: photoURL }
                      : { uri: generateAvatarUrl(currentUser?.name || user.fullName) }
                  }
                  style={{ width: 45, height: 45, borderRadius: 99 }}
                />
              </TouchableOpacity>
              <View>
                <Text style={{ fontFamily: "appFont", color: Colors.white }}>
                  Welcome back, 👋
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "appFont-bold",
                    color: Colors.white,
                  }}
                >
                  {currentUser?.name || user.fullName}
                </Text>
              </View>
            </View>
            <TouchableOpacity >
              <Ionicons name="notifications" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ textAlign: 'center', fontSize: 32, fontWeight: 900, color: Colors.primary, top: 80 }}>HERSafe</Text>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 500, color: Colors.black, top: 80 }}>Press the button in <Text style={{ color: Colors.secondary }}>Emergency</Text></Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', top: 120 }}>
          <Wave />
          <TouchableOpacity
            onPress={confirmAndSendSOS}
            style={styles.sosButtonStyle}
            disabled={loading}
            activeOpacity={0.8}
            >
            <LinearGradient
              colors={['#ff4e50', '#f9d423']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonWrapper}
            >
              {loading ? (
                <Text style={styles.buttonText}>Sending...</Text>
              ) : (
                <Text style={styles.buttonText}>emergency SOS</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => router.push("/gemini")}
        style={styles.floatingButton}
      >
        <Ionicons name="chatbubbles-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: Colors.primary,
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 999,
  },
  sosButtonStyle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    alignSelf: 'center',
    // top: 120,
    overflow: 'hidden',
  },
  buttonWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
});
