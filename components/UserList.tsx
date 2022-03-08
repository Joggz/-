import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { client } from "../hooks/useClient";

const UserList = ({ user }: any) => {
  const onPress = () => {
    // rememeber to had current userId  to the condition
    if (!user?.id) {
      return;
    }

    const channel = client.channel("messaging", {
      members: [user?.id, userId],
    });
    channel.watch();
  };
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <Image
        source={{
          uri: user.image ? user?.image : "https://i.imgur.com/fR9Jz14.png",
        }}
        style={styles.image}
      />
      <Text style={styles.text}>{user.name ? user?.name : "Demo User"}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 50,
    margin: 15,
    marginRight: 10,
  },
  text: {
    fontSize: 15,
  },
});

export default UserList;
