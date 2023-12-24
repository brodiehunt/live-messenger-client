import styled from "styled-components";
import AccountSettingsForm from "./AccountSettingsForm";
const ProfileSettingsStyles = styled.div`
  padding: 1rem;

  h2 {
    margin-bottom: 2rem;
  }

`;

export default function AccountSettings() {

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
  return (
    <ProfileSettingsStyles>
      <h2> Account Settings </h2>
      <AccountSettingsForm user={user}/>
    </ProfileSettingsStyles>
  )
}