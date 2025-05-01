import { StyleSheet, View, FlatList, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppointementCard from '@/components/AppointementCard';
import useBooking from '@/hooks/Data.services';

interface Booking {
  _id: string;
  userName: string;
  email: string;
  date: string;
  time: string;
  virtualCounselling: string;
  note?: string;
}

export default function Booking() {
  const { getUserBookings } = useBooking();
  const [appointments, setAppointments] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getUserBookings();
        setAppointments(data); 
      } catch (error) {
        console.error('Failed to fetch appointments:', (error as Error).message);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AppointementCard appointment={item} />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center' }}>
            No bookings available
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
