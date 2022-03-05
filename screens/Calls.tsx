import React, { useContext } from "react";
import { Text } from "react-native";
import { AppContext } from "../hooks/AppContext";

const Calls = ({ tabLabel }: any) => {
  const { selectedChannel, setSelectedChannel } = useContext<any>(AppContext);

  return <Text>kalls</Text>;
};

export default Calls;
