import styled from "styled-components";
import ConversationListItem from "./ConversationListItem";

const ConversationListStyles = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* flex-grow: 1; */
  /* height: 400px; */
  overflow-y: scroll;
`;

export default function FilteredConversationList({ conversations }) {
  return (
    <ConversationListStyles>
      {conversations.length ? (
        conversations.map((conversation) => {
          return (
            <ConversationListItem
              conversation={conversation}
              key={conversation._id}
            />
          );
        })
      ) : (
        <div>No Conversations match</div>
      )}
    </ConversationListStyles>
  );
}
