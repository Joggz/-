import React, { useEffect, useState, useContext } from "react";
import { Text } from "react-native";
import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
} from "stream-chat-expo";
import { AppContext } from "../hooks/AppContext";
import { client } from "../hooks/useClient";

const ChatChannel = ({ tabLabel }: any) => {
  const [isReady, setIsReady] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const userToken = client.devToken("joggz");
  const { channelId, setChannelId } = useContext(AppContext);

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
    // setChannelId(channel._client.key);
  };

  if (!isReady) {
    return null;
  } else {
    return (
      <OverlayProvider>
        <Chat client={client}>
          {console.log(selectedChannel)}
          {selectedChannel && channelId ? (
            <Channel channel={selectedChannel} keyboardVerticalOffset={0}>
              <MessageList />
              <MessageInput />
            </Channel>
          ) : (
            <ChannelList onSelect={onChannelPress} />
          )}
        </Chat>
      </OverlayProvider>
    );
  }
};

export default ChatChannel;
