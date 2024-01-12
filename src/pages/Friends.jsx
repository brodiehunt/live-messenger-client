import { useContext } from "react";
import AppContext from "../hooks/StateContext";
import PageHeader from "../components/PageHeader";
import CurrentFriendships from "../components/Friendships/CurrentFriendships";

export default function Friends() {
  const { store, dispatch } = useContext(AppContext);
  const user = store.user;

  return (
    <div style={{ height: "100svh" }}>
      <PageHeader user={user} pageTitle="Friendships" />
      <CurrentFriendships />
    </div>
  );
}
