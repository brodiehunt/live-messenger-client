import styled from "styled-components";

const MessageContainerStyles = styled.div`
  flex-grow: 1;
`;

export default function MessageContainer({messages}) {

  return (
    <MessageContainerStyles>
      {messages && messages.length > 0 ?
        (
          messages.map((message) => {
            return (
              <div key={message._id}>{message.content}</div>
            )
          })
        ) : (
          <div>No messages yet</div>
        )
      }
    </MessageContainerStyles>
  )
}