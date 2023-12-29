import styled from "styled-components"

const ConversationListStyles = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function ConversationsList() {
  return (
    <ConversationListStyles>
      No Conversations yet
    </ConversationListStyles>
  )
}