import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ChatChannel from "./Chat";

const ChatWithFloatingActionButton = ({ tabLabel }: any) => {
  const floatButtonEvent = () => Alert.alert("Floating Button Clicked");
  return (
    <SafeAreaProvider>
      <ChatChannel />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={floatButtonEvent}
        style={styles.TouchableOpacityStyle}
      >
        <Image
          source={require("../assets/images/splash.png")}
          style={styles.FloatingButtonStyle}
        />
      </TouchableOpacity>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 80,
    backgroundColor: "green",
    borderRadius: 50,
  },
  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
});

export default ChatWithFloatingActionButton;
