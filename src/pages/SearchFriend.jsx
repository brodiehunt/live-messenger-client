import { useContext } from "react";
import AppContext from "../hooks/StateContext";
import PageHeader from "../components/PageHeader";
import SearchFriendsInput from "../components/searchFriends/SearchFriendsInput";

export default function SearchFriend() {
  const {store, dispatch} = useContext(AppContext);
  const user = store.user;
  // Will contain search component
  // will container friend requests component.
  // Will contain people you may know component. 
  return (
    <>
      <PageHeader 
        user={user} 
        pageTitle="Search Friends"
      />
      <SearchFriendsInput />
    </>
  )
}