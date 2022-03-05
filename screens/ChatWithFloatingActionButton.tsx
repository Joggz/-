import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect } from "react";
import { TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppContext } from "../hooks/AppContext";
import { client } from "../hooks/useClient";
import ChatChannel from "./Chat";

const ChatWithFloatingActionButton = ({ tabLabel }: any) => {
  const navigation = useNavigation();

  const floatButtonEvent = () => {
    fetchUsers();
    navigation.navigate("ChatContact");
  };

  const { setUsers, users } = useContext(AppContext);
  const fetchUsers = async (): Promise<void> => {
    const response = await client.queryUsers({});
    response ? setUsers(response?.users) : setUsers([]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
