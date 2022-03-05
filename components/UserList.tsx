import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const UserList = ({ user }: any) => {
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: user.image ? user?.image : "https://i.imgur.com/fR9Jz14.png",
        }}
        style={styles.image}
      />
      <Text style={styles.text}>{user.name ? user?.name : "Demo User"}</Text>
    </View>
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
