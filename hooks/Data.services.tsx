import { useState } from 'react';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://appsail-50026188699.development.catalystappsail.in/api/booking';

interface Booking {
  _id: string;
  userId: string;
  userName: string;
  email: string;
  date: string;
  time: string;
  virtualCounselling: string;
  note?: string;
}

const useBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const createBooking = async (
    userName: string,
    email: string,
    date: string,
    time: string,
    virtualCounselling: string,
    note: string
  ) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email, date, time, virtualCounselling, note }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      ToastAndroid.show('Booking successful', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show((error as Error).message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const getUserBookings = async (): Promise<Booking[]> => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(`${API_URL}/my-bookings`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      setBookings(data);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch bookings');
      }

      return data.bookings;
    } catch (error) {
      console.error('Fetching bookings failed:', (error as Error).message);
      throw error;
    }
  };

  return { bookings, createBooking, getUserBookings, loading };
};

export default useBooking;
