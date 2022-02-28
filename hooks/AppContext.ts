import { createContext } from "react";

export const AppContext = createContext({
  channelId: "channelID",
  setChannelId: (cid: string) => {},
});
