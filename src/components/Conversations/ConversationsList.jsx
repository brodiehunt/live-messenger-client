import styled from "styled-components"
import { useState, useEffect, useContext } from 'react';
import { getConversations } from "../../services/conversationServices";
import ConversationListItem from "./ConversationListItem";
import AppContext from "../../hooks/StateContext";

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