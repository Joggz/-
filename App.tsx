import React, { useContext, useEffect, useMemo, useState } from "react";
import { LogBox, Platform, SafeAreaView, View, Pressable } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  RouteProp,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ChannelSort, Channel as ChannelType, StreamChat } from "stream-chat";
import { OverlayProvider, Streami18n } from "stream-chat-expo";

import { useStreamChatTheme } from "./useStreamChatTheme";
import Index from "./screens/Index";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "./constants/Colors";
import useColorScheme from "./hooks/useColorScheme";
import { AppContext } from "./hooks/AppContext";

LogBox.ignoreAllLogs(true);

type LocalAttachmentType = Record<string, unknown>;
type LocalChannelType = Record<string, unknown>;
type LocalCommandType = string;
type LocalEventType = Record<string, unknown>;
type LocalMessageType = Record<string, unknown>;
type LocalReactionType = Record<string, unknown>;
type LocalUserType = Record<string, unknown>;

type StreamChatGenerics = {
  attachmentType: LocalAttachmentType;
  channelType: LocalChannelType;
  commandType: LocalCommandType;
  eventType: LocalEventType;
  messageType: LocalMessageType;
  reactionType: LocalReactionType;
  userType: LocalUserType;
};

/**
 * Start playing with streami18n instance here:
 * Please refer to description of this PR for details: https://github.com/GetStream/stream-chat-react-native/pull/150
 */
const streami18n = new Streami18n({
  language: "en",
});

type ChannelRoute = { Channel: undefined };
type ChannelListRoute = { ChannelList: undefined };
type ThreadRoute = { Thread: undefined };
type NavigationParamsList = ChannelRoute & ChannelListRoute & ThreadRoute;

const Stack = createStackNavigator<NavigationParamsList>();

const App = () => {
  const [channelId, setChannelId] = useState("");
  const colorScheme = useColorScheme();
  const { bottom } = useSafeAreaInsets();
  const theme = useStreamChatTheme();

  return (
    <NavigationContainer
      theme={{
        colors: {
          ...(colorScheme === "dark" ? DarkTheme : DefaultTheme).colors,
          background: theme.colors?.white_snow || "#FCFCFC",
        },
        dark: colorScheme === "dark",
      }}
    >
      <OverlayProvider<StreamChatGenerics>
        bottomInset={bottom}
        i18nInstance={streami18n}
        value={{ style: theme }}
      >
        {
          <Stack.Navigator>
            <Stack.Screen
              name="Channel"
              component={Index}
              options={() => ({
                headerBackTitle: "Back",
                headerRight: () => (
                  <Pressable
                    onPress={() => console.log}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.5 : 1,
                    })}
                  >
                    <FontAwesome
                      name="ellipsis-v"
                      size={20}
                      color={Colors[colorScheme].text}
                      style={{ marginRight: 25 }}
                    />
                  </Pressable>
                ),
                headerTitle: "чат",
              })}
            />
          </Stack.Navigator>
        }
      </OverlayProvider>
    </NavigationContainer>
  );
};

export default () => {
  const theme = useStreamChatTheme();

  return (
    <SafeAreaProvider
      style={{ backgroundColor: theme.colors?.white_snow || "#FCFCFC" }}
    >
      <App />
    </SafeAreaProvider>
  );
};
