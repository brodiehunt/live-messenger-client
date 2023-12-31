import styled from "styled-components"
import { useState, useEffect } from 'react';
import { getConversations } from "../../services/conversationServices";
import ConversationListItem from "./ConversationListItem";

const ConversationListStyles = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export default function ConversationsList({user}) {
  const [conversations, setConversations] = useState(null);
  
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const conversationList = await getConversations();
        setConversations(conversationList);
        console.log(conversationList);
      } catch(error) {
        console.log('error', error);
      }
    }

    fetchConversations();
  }, [])
  return (
    <ConversationListStyles>
      {conversations && conversations.length > 0 ?
        (
          conversations.map((conv) => {
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