import styled from "styled-components";

const ProfileSettingsStyles = styled.div`
  padding: 1rem;

  h2 {
    margin-bottom: 2rem;
  }

`;

export default function ProfileSettings() {

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
      
    </ProfileSettingsStyles>
  )
}