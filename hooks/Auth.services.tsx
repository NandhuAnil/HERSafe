import { useState } from 'react';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

interface SignupResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: User;
  }

const API_URL = 'https://appsail-50026188699.development.catalystappsail.in/api/auth'; 

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (email: string, password: string): Promise<void> => {
    if (!email || !password) {
      ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.token && data.user) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));

        ToastAndroid.show('Login successful', ToastAndroid.SHORT);
        router.replace('/(tabs)')
      }
    } catch (error) {
      console.error('Login error:', (error as Error).message);
      ToastAndroid.show(`'Login failed' (error as Error).message`, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (name: string, email: string, password: string): Promise<void> => {
    if (!name || !email || !password) {
      ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data: SignupResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      if (data.token && data.user) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));

        ToastAndroid.show('Signup successful', ToastAndroid.SHORT);
        router.replace('/(tabs)'); // Navigate to home screen after signup
      }
    } catch (error) {
      console.error('Signup error:', (error as Error).message);
      ToastAndroid.show((error as Error).message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Logout failed');
      }
  
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
  
      ToastAndroid.show('Logout successful', ToastAndroid.SHORT);
      
      router.replace('/(auth)'); 
    } catch (error) {
      console.error('Logout error:', (error as Error).message);
      ToastAndroid.show((error as Error).message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  

  return { handleLogin, handleSignup, handleLogout, loading };
};

export default useAuth;