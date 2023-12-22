import styled from "styled-components";
import AccountDetailsForm from "./AccountDetailsFormField";
import {
  validateName, 
  validateEmail, 
  validateUsername } from '../utils/formValidation';
import {
  updateName,
  updateUsername,
  updateEmail
} from '../services/accountServices';

const AccountDetailsStyles = styled.div`
  padding: 1rem;

  h2 {
    margin-bottom: 2rem;
  }
`
export default function AccountDetails({user}) {
  return (
    <AccountDetailsStyles>
      <h2>Profile Details</h2>
      <AccountDetailsForm
        validateFunc={validateName}
        apiFunc={updateName}
        name='name'
        type="text"
        initialValue={user.name}
      />
      <AccountDetailsForm
        validateFunc={validateUsername}
        apiFunc={updateUsername}
        name='username'
        type="text"
        initialValue={user.username}
      />
      <AccountDetailsForm
        validateFunc={validateEmail}
        apiFunc={updateEmail}
        name='email'
        type="email"
        initialValue={user.email}
      />
    </AccountDetailsStyles>
  )
}