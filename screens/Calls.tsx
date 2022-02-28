import React, { useContext } from "react";
import { Text } from "react-native";
import { AppContext } from "../hooks/AppContext";

const Calls = ({ tabLabel }: any) => {
  const { channelId, setChannelId } = useContext(AppContext);

  return <Text>kalls</Text>;
};

export default Calls;
