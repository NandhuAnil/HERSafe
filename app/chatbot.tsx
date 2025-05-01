import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState, FC, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  ScrollView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define a type for the message structure
interface Message {
  message: string;
  isUser: boolean;
}

const ChatApp: FC = () => {
  // State to manage messages and input text
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");

  // Function to handle sending the message
  const handleSend = async () => {
    if (!inputText) return;

    // Add the user message to the state
    const newMessages = [...messages, { message: inputText, isUser: true }];
    setMessages(newMessages);

    try {
      // Send request to the backend using fetch
      const response = await fetch(
        "https://appsail-50026188699.development.catalystappsail.in/api/chatbot/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: inputText }),
        }
      );

      // Check if the response is OK
      if (response.ok) {
        const data = await response.json();
        const botResponse = data.answer || "Sorry, I couldn't find an answer.";

        // Add the bot response to the state
        const updatedMessages = [
          ...newMessages,
          { message: botResponse, isUser: false },
        ];
        setMessages(updatedMessages);

        // Store updated messages in AsyncStorage
        await AsyncStorage.setItem(
          "chatHistory",
          JSON.stringify(updatedMessages)
        );
      } else {
        console.error("Error fetching response from the server");
      }
    } catch (error) {
      console.error("Error making the request:", error);
    }

    // Clear input field after sending the message
    setInputText("");
  };

  // Load the chat history from AsyncStorage when the component mounts
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem("chatHistory");
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
      } catch (error) {
        console.error("Error loading chat history from AsyncStorage:", error);
      }
    };

    loadChatHistory();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView style={styles.messagesContainer}>
        {messages.length === 0 ? (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Welcome to HERSafe FAQ Assistant!
            </Text>
            <Text style={styles.welcomeSubtext}>Ask me anything related to App</Text>
          </View>
        ) : (
          messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.bubble,
                msg.isUser ? styles.userBubble : styles.botBubble,
                msg.isUser && { alignSelf: "flex-end" },
              ]}
            >
              <Text style={msg.isUser ? styles.userText : styles.botText}>
                {msg.message}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        
        <Button title="Send" onPress={handleSend} />
      </View> */}
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <FontAwesome name="send" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// Styling the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 40,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  bubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    alignSelf: "flex-start",
  },
  botBubble: {
    backgroundColor: "#E0E0E0",
    alignSelf: "flex-start",
  },
  userText: {
    color: "#fff",
    fontSize: 16,
  },
  botText: {
    color: "#000",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    // backgroundColor: "#0078fe",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  sendText: {
    color: "#fff",
    fontSize: 16,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 250,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    lineHeight: 26,
  },
  welcomeSubtext: {
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
    color: "#666",
  },
});

export default ChatApp;
