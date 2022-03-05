import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";

import { ChannelList, Chat, OverlayProvider } from "stream-chat-expo";
import { AppContext } from "../hooks/AppContext";
import { client } from "../hooks/useClient";

const ChatChannel = ({ tabLabel }: any) => {
  const [isReady, setIsReady] = useState(false);
  const userToken = client.devToken("joggz");
  const { setSelectedChannel } = useContext<any>(AppContext);
  const navigation = useNavigation();

  useEffect((): any => {
    const connectUser = async () => {
      try {
        await client.connectUser(
          {
            id: "joggz",
            name: "Joggz Swizz",
            image: "https://i.imgur.com/fR9Jz14.png",
          },
          userToken
        );
        const Channel = client.channel("messaging", "yat", {
          name: "yat",
        });
        await Channel.watch();
        setIsReady(true);
      } catch (error) {
        console.log("Error ==>", error);
      }
    };
    connectUser();

    return () => client.disconnectUser();
  }, []);

  const onChannelPress = (channel: any) => {
    setSelectedChannel(channel);
    navigation.navigate("ChatByID");
  };

  if (!isReady) {
    return null;
  } else {
    return (
      <OverlayProvider>
        <Chat client={client}>
          {/* <Channel channel={selectedChannel} keyboardVerticalOffset={0}>
              <MessageList />
              <MessageInput />
            </Channel> */}

          <ChannelList onSelect={onChannelPress} />
        </Chat>
      </OverlayProvider>
    );
  }
};

export default ChatChannel;
