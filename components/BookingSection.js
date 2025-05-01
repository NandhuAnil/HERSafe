import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import { Colors } from '@/constants/Colors';
import moment from 'moment'
import useBooking from '@/hooks/Data.services';
import useUser from '@/hooks/useUser';


const BookingSection = ({ counselorData }) => {
  const { currentUser } = useUser();
  const { createBooking } = useBooking();
  const [next7Days, setNext7Days] = useState([]);
  const [selectedDate, setSelectedDate] = useState(next7Days[0]?.date);
  const [timeList, setTimeList] = useState([])
  const [selectedTime, setSelectedTime] = useState(next7Days[0]?.date);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    getDays();
    getTime();
  }, [])

  const getDays = () => {
    const today = moment();
    const nextSevenDays = [];
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, 'days')
      nextSevenDays.push({
        date: date,
        day: date.format('ddd'), // Mon Tue
        formmatedDate: date.format('Do MMM') // 1 Jan
      })
    }
    setNext7Days(nextSevenDays)
  }


  const getTime = () => {
    const timeList = [];
    for (let i = 7; i <= 11; i++) {
      timeList.push({
        time: i + ":00 AM"
      })
      timeList.push({
        time: i + ":30 AM"
      })
    }

    for (let i = 1; i <= 5; i++) {
      timeList.push({
        time: i + ":00 PM"
      })
      timeList.push({
        time: i + ":30 PM"
      })
    }
    setTimeList(timeList)
  }

  const onSubmit = () => {
    if (!currentUser.name || !counselorData.email || !selectedDate || !selectedTime || !counselorData?.counselorName) {
      ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
      return;
    }

    setIsSubmitting(true);

    createBooking(currentUser.name, counselorData.email, selectedDate, selectedTime, counselorData.counselorName, notes)
      .then(() => {
        ToastAndroid.show('Appointment booked successfully!', ToastAndroid.SHORT);
        setIsSubmitting(false);
        setNotes('');
        setSelectedDate(next7Days[0]?.date);
        setSelectedTime(timeList[0]?.time);
      })
      .catch((error) => {
        ToastAndroid.show(`Booking failed: ${error.message}`, ToastAndroid.SHORT);
        setIsSubmitting(false);
      });
  };

  return (
    <View>
      <Text style={{ fontSize: 18, color: Colors.gray, marginBottom: 10 }}>Book Appointement</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "appFont-semibold" }}>
          Day
        </Text>
      </View>

      {/* Date */}
      <FlatList
        data={next7Days}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(item.date)}
            style={[styles.dayButton, selectedDate == item.date ? { backgroundColor: Colors.primary } : null]}
          >
            <Text style={[{ fontFamily: 'appFont' }, selectedDate == item.date ? { color: Colors.white } : null]}
            >
              {item.day}
            </Text>
            <Text style={[{ fontFamily: 'appFont-semibold' }, selectedDate == item.date ? { color: Colors.white } : null]}
            >
              {item.formmatedDate}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "appFont-semibold" }}>
          Time
        </Text>
      </View>

      {/* time */}
      <FlatList
        data={timeList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedTime(item.time)}
            style={[styles.dayButton, {
              paddingVertical: 16
            }, selectedTime == item.time ? { backgroundColor: Colors.primary } : null]}
          >
            <Text style={[{ fontFamily: 'appFont-semibold' }, selectedTime == item.time ? { color: Colors.white } : null]}
            >
              {item.time}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "appFont-semibold" }}>
          Note
        </Text>
      </View>

      {/* notes */}
      <TextInput
        onChangeText={(val) => setNotes(val)}
        numberOfLines={3}
        placeholder='Write Note Here'
        style={{ backgroundColor: Colors.gray, padding: 10, borderRadius: 10, borderColor: Colors.iconBg, borderWidth: 1 }}
      />

      {/* Make appointement Btn */}
      <TouchableOpacity
        onPress={onSubmit}
        disabled={isSubmitting}
        style={{ backgroundColor: Colors.primary, borderRadius: 99, padding: 13, margin: 10, left: 0, right: 0, marginBottom: 10, zIndex: 20, }}
      >
        <Text style={{ fontSize: 20, textAlign: 'center', color: Colors.white, fontFamily: 'appFont-semibold', fontSize: 17 }}>
          {isSubmitting ? 'Submitting...' : 'Make Appointment'}
        </Text>
      </TouchableOpacity>


    </View>
  );
}


const styles = StyleSheet.create({
  dayButton: {
    borderWidth: 1,
    borderRadius: 99,
    padding: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginRight: 10,
    borderColor: Colors.gray
  },
})

export default BookingSection;
