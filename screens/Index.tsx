import React, { useContext, useState } from "react";
import Calls from "./Calls";
import ChatChannel from "./Chat";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";

const Index = () => {
  return (
    <ScrollableTabView
      style={{ marginTop: 10 }}
      initialPage={0}
      renderTabBar={() => <ScrollableTabBar />}
    >
      <ChatChannel tabLabel="Chats" />
      <Calls tabLabel="Calls" />
    </ScrollableTabView>
  );
};

export default Index;
