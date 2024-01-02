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
  
  function insertSortedImmutable(array, newItem) {
    // Find the index where the new item should be inserted
    const index = array.findIndex(item => new Date(item.updatedAt) < new Date(newItem.updatedAt));
  
    if (index === -1) {
      // If no such index is found, the new item is the latest and should be added at the end
      return [...array, newItem];
    } else {
      // Create a new array with the new item inserted at the found index
      return [...array.slice(0, index), newItem, ...array.slice(index)];
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
      const newConversationResponse = await createConversation(userIds);
      const newConversation = newConversationResponse.data.data;
      console.log(newConversationResponse, newConversationResponse.status)
      if (newConversationResponse.status === 201) {
        // dispatch
        const newConversationsState = insertSortedImmutable(store.conversations, newConversation)

        dispatch({
          type: 'setConversations',
          data: newConversationsState
        })
      }
    
      return navigate(`/${user._id}/conversation/${newConversation._id}`);
      
    } catch(error) {
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