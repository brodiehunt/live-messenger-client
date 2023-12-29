import { useContext, useState } from "react";
import AppContext from "../hooks/StateContext";
import PageHeader from "../components/PageHeader";
import SearchContacts from "../components/NewConversation/SearchContacts";
import NewConversationInfo from "../components/NewConversation/NewConversationInfo";

export default function NewConversation() {
  const {store, dispatch} = useContext(AppContext);
  const user = store.user;
  const [recipients, setRecipients] = useState(null);
  
  function addRecipient(user) {
    if (!recipients) {
      return setRecipients([user]);
    }

    const alreadyRecipient = recipients.find((recipient) => user._id === recipient._id);
    if (!alreadyRecipient) {
      setRecipients([...recipients, user]);
    }
  }

  function deleteRecipient(userId){
    const updatedRecipients = recipients.filter((recipient) => {
      return recipient._id !== userId
    })
    setRecipients(updatedRecipients);
  }

  return (
    <>
      <PageHeader 
        user={user} 
        pageTitle="New Conversation"
      />
      <SearchContacts 
        addRecipient={addRecipient}
      />
      <NewConversationInfo 
        recipients={recipients}
        deleteRecipient={deleteRecipient}
      />
    </>
  )
}