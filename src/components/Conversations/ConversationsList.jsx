import styled from "styled-components"
import { useState, useEffect, useContext } from 'react';
import { getConversations } from "../../services/conversationServices";
import ConversationListItem from "./ConversationListItem";
import AppContext from "../../hooks/StateContext";
import SocketContext from "../../hooks/socket";

const ConversationListStyles = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* flex-grow: 1; */
  /* height: 400px; */
  overflow-y: scroll;
`

export default function ConversationsList({user}) {
  // const [conversations, setConversations] = useState(null);
  const {store, dispatch} = useContext(AppContext);
  const socket = useContext(SocketContext);
  const cachedConversations = store.conversations;

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const conversationList = await getConversations();
        // setConversations(conversationList);
        dispatch({
          type: 'setConversations',
          data: conversationList
        })
      } catch(error) {
        console.log('error', error);
      }
    }

    if (!cachedConversations) {
      fetchConversations();
    } 
    
  }, [])

  useEffect(() => {
    if (socket) {
      const handleConversationsUpdate = (conversation) => {
        if (store.conversations) {
          const filterConvo = [...store.conversations].filter((conv) => {
            return conv._id !== conversation._id;
          })
          
          const newConversations = [conversation, ...filterConvo]
          dispatch({
            type: 'setConversations',
            data: newConversations
          })
        }
      }

      socket.on('newMessage', handleConversationsUpdate);

      return () => {
        socket.off('newMessage', handleConversationsUpdate);
      }
    }
  }, [socket, store.conversations])

  
  return (
    <ConversationListStyles>
      {cachedConversations && cachedConversations.length > 0 ?
        (
          cachedConversations.map((conv) => {
            return (
              <ConversationListItem 
                conversation={conv} 
                key={conv._id}
              />
            )
          })
        ) : (
          <div>No Conversations yet</div>
        )
      }
    </ConversationListStyles>
  )
}