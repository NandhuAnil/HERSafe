import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const counselors = [
    {
        "counselorName": "Dr. Ananya Ramesh",
        "experience": "8 years",
        "contact": "9876543210",
        "city": "Chennai",
        "image": "https://randomuser.me/api/portraits/women/44.jpg",
        "email": "nandhusvan@gmail.com"
    },
    {
        "counselorName": "Ms. Priya Shankar",
        "experience": "5 years",
        "contact": "8765432109",
        "city": "Coimbatore",
        "image": "https://randomuser.me/api/portraits/women/45.jpg",
        "email": "52it21vinodhini@gmail.com"
    },
    {
        "counselorName": "Dr. Kavya Natarajan",
        "experience": "10 years",
        "contact": "7654321098",
        "city": "Madurai",
        "image": "https://randomuser.me/api/portraits/women/46.jpg",
        "email": "52it21vinodhini@gmail.com"
    },
    {
        "counselorName": "Ms. Meera Subramanian",
        "experience": "6 years",
        "contact": "6543210987",
        "city": "Tiruchirappalli",
        "image": "https://randomuser.me/api/portraits/women/47.jpg",
        "email": "52it21vinodhini@gmail.com"
    },
    {
        "counselorName": "Dr. Sneha Krishnan",
        "experience": "7 years",
        "contact": "5432109876",
        "city": "Salem",
        "image": "https://randomuser.me/api/portraits/women/48.jpg",
        "email": "52it21vinodhini@gmail.com"
    },
    {
        "counselorName": "Ms. Divya Raman",
        "experience": "4 years",
        "contact": "4321098765",
        "city": "Vellore",
        "image": "https://randomuser.me/api/portraits/women/49.jpg",
        "email": "52it21vinodhini@gmail.com"
    },
    {
        "counselorName": "Dr. Janani Murugan",
        "experience": "9 years",
        "contact": "3210987654",
        "city": "Erode",
        "image": "https://randomuser.me/api/portraits/women/50.jpg",
        "email": "52it21vinodhini@gmail.com"
    },
    {
        "counselorName": "Ms. Shruti Balasubramanian",
        "experience": "3 years",
        "contact": "2109876543",
        "city": "Thoothukudi",
        "image": "https://randomuser.me/api/portraits/women/51.jpg",
        "email": "52it21vinodhini@gmail.com"
    },
    {
        "counselorName": "Dr. Harini Venkat",
        "experience": "12 years",
        "contact": "1098765432",
        "city": "Tirunelveli",
        "image": "https://randomuser.me/api/portraits/women/52.jpg",
        "email": "52it21vinodhini@gmail.com"
    },
    {
        "counselorName": "Ms. Rithika Mohan",
        "experience": "2 years",
        "contact": "9988776655",
        "city": "Kanchipuram",
        "image": "https://randomuser.me/api/portraits/women/53.jpg",
        "email": "52it21vinodhini@gmail.com"
    }
];

export default function virtualschedule() {
    const router = useRouter();

    const handlePress = (item: any) => {
        router.push({
            pathname: '/bookAppointement',
            params: { counselorData: JSON.stringify(item) }
        });
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={counselors}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.name}>{item.counselorName}</Text>
                            <Text>{item.experience} Experience</Text>
                            <Text>{item.city}</Text>
                            <Text>Contact: {item.contact}</Text>
                            <Text>Email: {item.email}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 3, // shadow for Android
        shadowColor: '#000', // shadow for iOS
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    }
});
