import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConversation, sendReadReciept } from '../services/conversationServices';
import PageHeader from "../components/PageHeader";
import MessageContainer from '../components/Conversations/MessagesContainer';
import NewMessageForm from '../components/Conversations/NewMessageForm';
import AppContext from "../hooks/StateContext";
import styled from 'styled-components';
import ConversationHeader from '../components/Conversations/ConversationHeader';
import ConversationModal from '../components/Conversations/ConversationModal';
import SocketContext from '../hooks/socket';
import ReadByContainer from '../components/Conversations/ReadByContainer';

const ConversationStyles = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default function Conversation() {
  const params = useParams();
  const { store, dispatch } = useContext(AppContext);
  const socket = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(true);
  const [conversation, setConversation] = useState(null);
  const [settingsModal, setSettingsModal] = useState(false);

  const user = store.user;
  const conversationId = params.conversationId;


  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setIsLoading(true);
        const fetchedConversation = await getConversation(conversationId);
        setConversation(fetchedConversation);
        // Update conversations list... 
        if (store.conversations) {
          const updatedConversations = store.conversations.map((conv) => {
            if (conv._id === fetchedConversation._id) {
              return {...conv, readBy: fetchedConversation.readBy}
            }
            return conv;
          })
        
          dispatch({
            type: 'setConversations',
            data: updatedConversations
          });
        }
      } catch(error) {
        console.log('error', error)
      }
      setIsLoading(false);
    }

    fetchConversation();
  }, [conversationId]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = async (updatedConv) => {
        const newMessage = updatedConv.lastMessage;
        if (updatedConv._id === conversationId) {
          setConversation((currentConversation) => {
            if (currentConversation) {
              return {
                ...currentConversation,
                readBy: updatedConv.readBy,
                messages: [...currentConversation.messages, newMessage]
              };
            }
            return null;
          })
          console.log('what is happening')
          // send message to db that you have read the convo
          try {
            const newReadBy = await sendReadReciept(updatedConv._id);
            console.log('after', newReadBy);
            setConversation((currentConversation) => {
              if (currentConversation) {
                return {
                  ...currentConversation,
                  readBy: newReadBy.readBy
                }
              }
            });
            console.log('after after');
            if (store.conversations) {
              const updatedConversations = store.conversations.map((conv) => {
                if (conv._id === conversation._id) {
                  return {...conv, readBy: newReadBy.readBy, lastMessage: newReadBy.lastMessage}
                }
                return conv;
              })
              console.log('updatedConvers', updatedConversations);
              dispatch({
                type: 'setConversations',
                data: updatedConversations
              });
            }
          } catch(error) {
            console.log(error);
          }
        }
      }

      const handleReadNotification = (updatedConv) => {
        if (updatedConv._id === conversationId) {
          setConversation((currentConversation) => {
            if (currentConversation) {
              return {
                ...currentConversation,
                readBy: updatedConv.readBy
              }
            }
          })
        }
      }


      socket.on('newMessage', handleNewMessage);
      socket.on('read', handleReadNotification);

      return () => {
        socket.off('newMessage', handleNewMessage);
        socket.off('read', handleReadNotification);
      }
    }
  }, [socket, conversationId, store.conversations]);

  function addNewMessage(message) {
    setConversation({...conversation, messages: [...conversation.messages, message]})
  }

  return (
    <ConversationStyles>
      {settingsModal && conversation &&
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
      isLoading={isLoading}
      user={user}
      participants={conversation?.participants}
      groupMetaData={conversation?.groupMetaData}
      setSettingsModal={setSettingsModal}
      />
      
      <MessageContainer 
        isLoading={isLoading}
        messages={conversation?.messages}
      />
      {!isLoading &&
        <ReadByContainer 
          readBy={conversation.readBy}
          participants={conversation.participants}
        />
      }
      
      <NewMessageForm 
        addNewMessage={addNewMessage}
        conversationId={conversationId}
      />
    </ConversationStyles >
  )
}