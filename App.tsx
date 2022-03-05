import React, { useContext, useEffect, useMemo, useState } from "react";
import { LogBox, Pressable, StyleSheet, View } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
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
import ChatScreen from "./screens/ChatScreen";
import ChatContact from "./screens/ChatContact";
import { useNavigation } from "@react-navigation/native";

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
type ChatRoute = { ChatScreen: undefined };
type ContactRoute = { ChatContact: undefined };
type NavigationParamsList = ChannelRoute &
  ChannelListRoute &
  ThreadRoute &
  ChatRoute;

const Stack = createStackNavigator<NavigationParamsList>();

const App = () => {
  const colorScheme = useColorScheme();
  const { bottom } = useSafeAreaInsets();
  const theme = useStreamChatTheme();
  const [selectChannel, setSelectChannel] = useState<any>({});
  const { selectedChannel, setSelectedChannel } = useContext(AppContext);
  const [chatUsers, setChatUsers] = useState<any>([]);

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
      <AppContext.Provider
        value={{
          selectedChannel: selectChannel,
          setSelectedChannel: setSelectChannel,
          users: chatUsers,
          setUsers: setChatUsers,
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
                      onPress={() => setSelectedChannel({})}
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

              <Stack.Screen
                name="ChatByID"
                component={ChatScreen}
                options={() => ({
                  headerBackTitle: "Back",
                  headerRight: () => (
                    <Pressable
                      onPress={() => setSelectedChannel({})}
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

              <Stack.Screen
                name="ChatContact"
                component={ChatContact}
                options={() => ({
                  headerBackTitle: "Back",
                  // headerLeft: () => (
                  //   <Pressable
                  //     onPress={() => console.log}
                  //     style={({ pressed }) => ({
                  //       opacity: pressed ? 0.5 : 1,
                  //     })}
                  //   >
                  //     <FontAwesome
                  //       name="arrow-left"
                  //       size={15}
                  //       color={Colors[colorScheme].text}
                  //       style={{ marginLeft: 30 }}
                  //     />
                  //   </Pressable>
                  // ),
                  headerRight: () => (
                    <View style={styles.bar}>
                      <Pressable
                        onPress={() => console.log}
                        style={({ pressed }) => ({
                          opacity: pressed ? 0.5 : 1,
                        })}
                      >
                        <FontAwesome
                          name="search"
                          size={15}
                          color={Colors[colorScheme].text}
                          style={{ marginRight: 35 }}
                        />
                      </Pressable>
                      <Pressable
                        onPress={() => console.log}
                        style={({ pressed }) => ({
                          opacity: pressed ? 0.5 : 1,
                        })}
                      >
                        <FontAwesome
                          name="ellipsis-v"
                          size={15}
                          color={Colors[colorScheme].text}
                          style={{ marginRight: 25 }}
                        />
                      </Pressable>
                    </View>
                  ),
                  headerTitle: "Select Contact",
                })}
              />
            </Stack.Navigator>
          }
        </OverlayProvider>
      </AppContext.Provider>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
  },
});

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
