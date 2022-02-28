import React, { useEffect, useState, useContext } from "react";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
} from "stream-chat-expo";
import { AppContext } from "../hooks/AppContext";
import { client } from "../hooks/useClient";

const ChatScreen = ({ tabLabel }: any) => {
  const { selectedChannel } = useContext<any>(AppContext);

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Channel channel={selectedChannel} keyboardVerticalOffset={0}>
          <MessageList />
          <MessageInput />
        </Channel>
      </Chat>
    </OverlayProvider>
  );
};

export default ChatScreen;
