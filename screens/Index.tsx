import React, { useContext, useState } from "react";
import Calls from "./Calls";
import ChatChannel from "./Chat";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import { AppContext } from "../hooks/AppContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Index = () => {
  const [channelId, setChannelId] = useState("");

  console.log("these should be updated", channelId, setChannelId);
  return (
    <AppContext.Provider value={{ channelId, setChannelId }}>
      {!channelId ? (
        <ScrollableTabView
          style={{ marginTop: 10 }}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <ChatChannel tabLabel="Chats" />
          <Calls tabLabel="Calls" />
        </ScrollableTabView>
      ) : (
        <SafeAreaProvider>
          <ChatChannel />
        </SafeAreaProvider>
      )}
    </AppContext.Provider>
  );
};

export default Index;
