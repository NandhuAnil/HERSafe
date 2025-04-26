import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import useAuth from "@/hooks/Auth.services";
import useUser from "@/hooks/useUser";
import { router } from "expo-router";

type IconName = keyof typeof MaterialIcons.glyphMap;

const categoryList: {
  id: number;
  icon: IconName;
  title: string;
}[] = [
    {
      id: 0,
      icon: "folder-shared",
      title: "Tell Your Friend",
    },
    {
      id: 1,
      icon: "settings",
      title: "SOS Settings",
    },
  ];

const user = {
  fullName: "Lara",
  userEmail: "example@gmail.com",
};

export default function profile() {
  const { currentUser } = useUser();
  const userImageUrl = "";
  const { handleLogout } = useAuth();

  const onSubmit = () => {
    handleLogout();
  };

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
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      {/* <Text
        style={{
          fontSize: 25,
          fontFamily: "appFont-semibold",
          textAlign: "center",
        }}
      >
        My Profile
      </Text> */}

      {/* profile image */}
      <View style={{ marginTop: 10 }}>
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: "column", gap: 20, alignItems: "center" }}
          >
            <View style={{ position: "relative" }}>
              <Image
                source={
                  userImageUrl
                    ? { uri: userImageUrl }
                    : { uri: generateAvatarUrl(currentUser?.name || user.fullName) }
                }
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 99,
                  objectFit: "contain",
                }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: Colors.primary,
                  borderRadius: 99,
                  padding: 5,
                }}
              >
                <MaterialIcons name="mode-edit" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View
              style={{ flexDirection: "column", gap: 1, alignItems: "center" }}
            >
              <Text style={{ fontSize: 15, fontFamily: "appFont-semibold" }}>
                {currentUser?.name || user.fullName}
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "appFont",
                  color: Colors.text,
                }}
              >
                {currentUser?.email || user.userEmail}
              </Text>
            </View>
          </View>
        </View>

        <FlatList
          data={categoryList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                if (index === 1) {
                  router.push('/sossetting'); 
                } else {
                  Alert.alert("Feature Coming Soon", "This feature is currently under development. Stay tuned for updates!"); // Show alert for other indices
                }
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 30,
              }}
            >
              <View style={styles.iconTextContainer}>
                <View
                  style={{
                    padding: 9,
                    backgroundColor: Colors.iconBg,
                    borderRadius: 10,
                  }}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={25}
                    color={Colors.primary}
                  />
                </View>
                <Text style={{ fontSize: 20, fontFamily: "appFont" }}>
                  {item.title}
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          )}
        />

        {/* Log out btn */}
        <TouchableOpacity
          onPress={onSubmit}
          style={{ marginTop: 35 }}
        >
          <View style={styles.iconTextContainer}>
            <View
              style={{
                padding: 9,
                backgroundColor: Colors.iconBg,
                borderRadius: 10,
              }}
            >
              <MaterialIcons name="logout" size={24} color="red" />
            </View>
            <Text style={{ fontSize: 20, fontFamily: "appFont" }}>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconTextContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 360,
    alignSelf: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "appFont",
  },
});