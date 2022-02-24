import { Text, View } from "react-native";
import { RootTabScreenProps } from "../types";

import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <ScrollableTabView
      style={{ marginTop: 10 }}
      initialPage={0}
      renderTabBar={() => <ScrollableTabBar />}
    >
      <Text tabLabel="Chat">Chat</Text>
      <Text tabLabel="Calls">Calls</Text>
    </ScrollableTabView>
  );
}
