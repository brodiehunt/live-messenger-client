import { useContext } from "react";
import AppContext from "../hooks/StateContext";
import PageHeader from "../components/PageHeader";
import ProfileDetails from '../components/ProfileDetails';
import ProfileSettings from '../components/ProfileSettings';

export default function Account() {
  // const {store, dispatch} = useContext(AppContext);
  // const user = store.user;
  const user = {
    name: 'Brodie',
    username: 'Brodiehuntboi',
    email: 'brodiehunt7@gmail.com',
    avatarUrl: '/figure-this-out',
    accountSettings: {
      isPrivate: true,
      allowNonFriendMessages: true,
    }
  }
  console.log(user);
  return (
    <>
      <PageHeader 
        user={user} 
        pageTitle="Your Account"
      />
      <ProfileDetails user={user}/>
      <ProfileSettings />
    </>
  )
}