import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import responses from "./responses";

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const getRandomResponse = () => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex].text;
  };

  const handleSend = () => {
    if (message.trim() !== "") {
      setMessages([
        ...messages,
        { id: Date.now().toString(), text: message, type: "sent" },
      ]);
      setMessage("");

      setTimeout(() => {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: (Date.now() + 1).toString(),
            text: getRandomResponse(),
            type: "received",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Nom du contact</Text>
      </View>

      <View style={styles.messagesContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.type === "sent" ? styles.myBubble : styles.theirBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.type === "sent" ? styles.myMessageText : {},
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Écrire un message..."
          />
          <TouchableOpacity onPress={handleSend}>
            <Ionicons name="send" size={24} color="#007aff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 50,
    backgroundColor: "#f7f7f7",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messagesContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bubble: {
    maxWidth: "70%",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  theirBubble: {
    backgroundColor: "#ececec",
  },
  myBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007aff",
  },
  messageText: {
    color: "black",
  },
  myMessageText: {
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 5,
    backgroundColor: "white",
    marginBottom: 24,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    height: 40,
  },
});
