import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import BookingSection from '@/components/BookingSection';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams } from "expo-router";

interface CounselorData {
  counselorName: string;
  experience: string;
  contact: string;
  city: string;
  image: string;
  email: string;
}

export default function bookAppointment() {
  const { counselorData } = useLocalSearchParams<{ counselorData: string }>();
  const parsedData: CounselorData = counselorData ? JSON.parse(counselorData) : null;

  return (
    <ScrollView style={{ padding: 20 }}>
      {parsedData ? (
        <>
          <View style={styles.header}>
            <Image source={{ uri: parsedData.image }} style={styles.image} />
            <View>
              <Text style={styles.title}>{parsedData.counselorName}</Text>
              <Text>{parsedData.city}</Text>
            </View>
          </View>
        </>
      ) : (
        <Text>No data available</Text>
      )}
      <View style={{ borderWidth: 1, borderColor: Colors.gray, marginVertical: 15 }} />
      <BookingSection counselorData={parsedData} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
})