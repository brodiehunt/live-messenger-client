import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import AppContext from "../hooks/StateContext";
import PageHeader from "../components/PageHeader";
import SearchContacts from "../components/NewConversation/SearchContacts";
import NewConversationInfo from "../components/NewConversation/NewConversationInfo";
import { createConversation } from "../services/conversationServices";

export default function NewConversation() {
  const navigate = useNavigate();
  const {store, dispatch} = useContext(AppContext);
  const user = store.user;
  const [recipients, setRecipients] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const {activateToast, ToastComponent} = useToast();
  
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

  async function handleCreateConversation() {
    if (!recipients) {
      return activateToast('Error', 'Please add recipients.', 'error')
    }

    const userIds = recipients.map((recipient) => {
      return recipient._id;
    })

    try {
      const newConversation = await createConversation(userIds);
      return navigate(`/${user._id}/conversation/${newConversation._id}`);
      console.log(newConversation);
    } catch(error) {
      console.log(error);
      activateToast('Error creating Conversation', 'Could not create your conversation.', 'error')
    }
    
  }

  return (
    <>
      <ToastComponent />
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
        isLoading={isLoading}
        handleCreateConversation={handleCreateConversation}
      />
    </>
  )
}