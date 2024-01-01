import styled from "styled-components";
import Message from "./Message";

const MessageContainerStyles = styled.div`
  padding: 0 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  overflow-y: scroll;

`;

export default function MessageContainer({messages}) {
  // reverse map instead!
  // const sortedMessages = messages.sort((a, b) => {
  //   const dateA = new Date(a.createdAt);
  //   const dateB = new Date(b.createdAt);

  //   if (dateA > dateB) {
  //     return -1
  //   }
  //   return 1;
  // })

  return (
    <MessageContainerStyles>
      {messages && messages.length > 0 ?
        (
          messages.map((message, index, array) => {
            return (
              <Message 
                key={array[array.length - 1 - index]._id}
                message={array[array.length - 1 - index]}
              />
            )
          })
        ) : (
          <div>No messages yet</div>
        )
      }
    </MessageContainerStyles>
  )
}