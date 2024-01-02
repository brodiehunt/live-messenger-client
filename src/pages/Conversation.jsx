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
import SocketContext from '../hooks/socket';

const ConversationStyles = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default function Conversation() {
  const params = useParams();
  const { store, dispatch } = useContext(AppContext);
  const socket = useContext(SocketContext);
  const [conversation, setConversation] = useState(null);
  const [settingsModal, setSettingsModal] = useState(false);

  const user = store.user;
  const conversationId = params.conversationId;
 

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const conversation = await getConversation(conversationId);
        console.log(conversation, 'conversation')
        setConversation(conversation);
      } catch(error) {
        console.log('error', error)
      }
    }

    fetchConversation();
  }, [conversationId]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (updatedConv) => {
        const newMessage = updatedConv.lastMessage;
        if (updatedConv._id === conversationId) {
          setConversation((currentConversation) => {
            if (currentConversation) {
              return {
                ...currentConversation,
                messages: [...currentConversation.messages, newMessage]
              };
            }
            return null;
          })
        }
      }

      socket.on('newMessage', handleNewMessage);

      return () => {
        socket.off('newMessage', handleNewMessage);
      }
    }
  }, [socket, conversationId]);

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