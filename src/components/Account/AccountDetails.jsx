import AccountDetailsForm from "./AccountDetailsForm";
import AccountSectionStyles from "../styles/Account/AccountSectionStyles";
import {
  validateName,
  validateEmail,
  validateUsername,
} from "../../utils/formValidation";
import {
  updateName,
  updateUsername,
  updateEmail,
} from "../../services/accountServices";

export default function AccountDetails({ user }) {
  return (
    <AccountSectionStyles>
      <h2>Profile Details</h2>
      <AccountDetailsForm
        validateFunc={validateName}
        apiFunc={updateName}
        name="name"
        type="text"
        initialValue={user.name}
      />
      <AccountDetailsForm
        validateFunc={validateUsername}
        apiFunc={updateUsername}
        name="username"
        type="text"
        initialValue={user.username}
      />
      <AccountDetailsForm
        validateFunc={validateEmail}
        apiFunc={updateEmail}
        name="email"
        type="email"
        initialValue={user.email}
      />
    </AccountSectionStyles>
  );
}
