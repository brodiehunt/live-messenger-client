import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConversation } from '../services/conversationServices';
import PageHeader from "../components/PageHeader";
import MessageContainer from '../components/Conversations/MessagesContainer';
import NewMessageForm from '../components/Conversations/NewMessageForm';
import AppContext from "../hooks/StateContext";
import styled from 'styled-components';
import ConversationHeader from '../components/Conversations/ConversationHeader';
import ConversationModal from '../components/Conversations/ConversationModal';

const ConversationStyles = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default function Conversation() {
  const params = useParams();
  const { store, dispatch } = useContext(AppContext);
  const [conversation, setConversation] = useState(null);
  const [settingsModal, setSettingsModal] = useState(false);

  const user = store.user;
  const conversationId = params.conversationId;

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const conversation = await getConversation(conversationId);
        console.log(conversation)
        setConversation(conversation);
        setMessages(conversation.messages);
      } catch(error) {
        console.log('error', error)
      }
    }

    fetchConversation();
  }, [conversationId]);

  function addNewMessage(message) {
    setConversation({...conversation, messages: [...conversation.messages, message]})
  }

  if (!conversation) return <div>Ooops</div>
  return (
    <ConversationStyles>
      {settingsModal && 
        <ConversationModal 
          participants={conversation.participants}
          groupMetaData={conversation.groupMetaData}
          setSettingsModal={setSettingsModal}
        />
      }
      <PageHeader 
        pageTitle="Conversation"
        user={user}
      />
      <ConversationHeader 
        user={user}
        participants={conversation.participants}
        groupMetaData={conversation.groupMetaData}
        setSettingsModal={setSettingsModal}
      />
      <MessageContainer 
        messages={conversation.messages}
      />
      <NewMessageForm 
        addNewMessage={addNewMessage}
        conversationId={conversationId}
      />
    </ConversationStyles >
  )
}