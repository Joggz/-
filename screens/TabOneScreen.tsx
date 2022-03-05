import { Text, View } from "react-native";
import { RootTabScreenProps } from "../types";

import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import { client } from "../hooks/useClient";
// import React, { useEffect } from "react";
// import { ChannelList, Chat, OverlayProvider } from "stream-chat-expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ChatChannel from "./Chat";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <SafeAreaProvider>
      <ScrollableTabView
        style={{ marginTop: 10 }}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
      >
        <ChatChannel tabLabel="Chats" />
        <Text tabLabel="Calls">Calls</Text>
      </ScrollableTabView>
    </SafeAreaProvider>
  );
}
