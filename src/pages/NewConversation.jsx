import { useContext } from "react";
import AppContext from "../hooks/StateContext";
import PageHeader from "../components/PageHeader";

export default function NewConversation() {
  const {store, dispatch} = useContext(AppContext);
  const user = store.user;
  console.log(user);
  return (
    <>
      <PageHeader 
        user={user} 
        pageTitle="New Conversation"
      />
      <div>Email: {user.email}</div>
      <div>Name: {user.name}</div>
      <div>Username: {user.username}</div>
      <img src={user.avatarUrl} />
    </>
  )
}