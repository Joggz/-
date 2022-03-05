import { createContext } from "react";

export const AppContext = createContext({
  selectedChannel: null,
  setSelectedChannel: (cid: string) => {},
  users: [],
  setUsers: (user: Array<any>) => [],
});
