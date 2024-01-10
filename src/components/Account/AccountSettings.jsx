import AccountSettingsForm from "./AccountSettingsForm";
import AccountSectionStyles from "../styles/Account/AccountSectionStyles";

export default function AccountSettings() {
  return (
    <AccountSectionStyles>
      <h2> Account Settings </h2>
      <AccountSettingsForm />
    </AccountSectionStyles>
  );
}
