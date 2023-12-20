import { useContext } from "react";
import AppContext from "../hooks/StateContext";
export default function Account() {
  const {store, dispatch} = useContext(AppContext);
  const user = store.user;
  console.log(user);
  return (
    <>
      <h1>Account</h1>
      <div>Email: {user.email}</div>
      <div>Name: {user.name}</div>
      <div>Username: {user.username}</div>
      <img src={user.avatarUrl} />
    </>
  )
}