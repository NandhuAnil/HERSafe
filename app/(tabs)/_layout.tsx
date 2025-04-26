import { Colors } from '@/constants/Colors';
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="virtualschedule"
        options={{
          title: 'Virtual conselling',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="videocamera" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'My Booking',
          tabBarIcon: ({ color, size }) => (
            <Feather name="clipboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
            headerShown: true,
          }}
        />
    </Tabs>
  );
}
