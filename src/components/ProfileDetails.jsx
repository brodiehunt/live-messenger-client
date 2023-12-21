import styled from "styled-components";
import ProfileForm from "./ProfileFormField";
import {
  validateName, 
  validateEmail, 
  validateUsername } from '../utils/formValidation';

const ProfileDetailsStyles = styled.div`
  padding: 1rem;

  h2 {
    margin-bottom: 2rem;
  }
`
export default function ProfileDetails({user}) {
  return (
    <ProfileDetailsStyles>
      <h2>Profile Details</h2>
      <ProfileForm
        validateFunc={validateName}
        name='name'
        type="text"
        initialValue={user.name}
      />
      <ProfileForm
        validateFunc={validateUsername}
        name='username'
        type="text"
        initialValue={user.username}
      />
      <ProfileForm
        validateFunc={validateEmail}
        name='email'
        type="email"
        initialValue={user.email}
      />
    </ProfileDetailsStyles>
  )
}