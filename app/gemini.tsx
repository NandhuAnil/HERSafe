import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Message {
  role: "user" | "model";
  content: string;
}

const STORAGE_KEY = "@chat_history";
const GEMINI_API_KEY = "AIzaSyBPIt9QwBFbWK2tJ6cLpQ6W4_y_AtcBPbc";

const GeminiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setMessages(JSON.parse(data));
      }
    };
    loadMessages();
  }, []);

  const saveMessages = async (msgs: Message[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    } catch (error) {
      console.error("Save error", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);
    saveMessages(newMessages);

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: input }] }],
        }
      );

      const replyText =
        res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";
      const replyMessage: Message = { role: "model", content: replyText };

      const finalMessages = [...newMessages, replyMessage];
      setMessages(finalMessages);
      saveMessages(finalMessages);
    } catch (error: any) {
      const errorMessage: Message = {
        role: "model",
        content: "Error getting response.",
      };
      const finalMessages = [...newMessages, errorMessage];
      setMessages(finalMessages);
      saveMessages(finalMessages);
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "android" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.chatBox}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.length === 0 ? (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Welcome to HERSafe Chatbot Assistant!
            </Text>
            <Text style={styles.welcomeSubtext}>Ask me anything </Text>
          </View>
        ) : (
          messages.map((msg, idx) => (
            <View
              key={idx}
              style={[
                styles.messageBubble,
                msg.role === "user" ? styles.userBubble : styles.modelBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.role === "user"
                    ? styles.userMessageText
                    : styles.modelMessageText,
                ]}
              >
                {msg.content}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          {/* <Text style={styles.sendText}>Send</Text> */}
          <FontAwesome name="send" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GeminiChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F9",
  },
  chatBox: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 30,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
    marginVertical: 6,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: Colors.primary,
    borderTopRightRadius: 0,
  },
  modelBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#E1E1E1",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: Colors.white,
  },
  modelMessageText: {
    color: Colors.black,
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
    marginTop: 350,
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
