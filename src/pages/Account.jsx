import { useContext } from "react";
import AppContext from "../hooks/StateContext";
import PageHeader from "../components/PageHeader";
import AccountDetails from "../components/Account/AccountDetails";
import AccountSettings from "../components/Account/AccountSettings";

export default function Account() {
  const { store, dispatch } = useContext(AppContext);
  const user = store.user;

  return (
    <>
      <PageHeader user={user} pageTitle="Your Account" />
      <AccountDetails user={user} />
      <AccountSettings />
    </>
  );
}
