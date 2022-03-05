import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { AppContext } from "../hooks/AppContext";
import UserList from "../components/UserList";

const ChatContact = () => {
  const { users } = useContext(AppContext);
  return (
    <View>
      <Text></Text>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserList user={item} />}
      />
    </View>
  );
};

export default ChatContact;
