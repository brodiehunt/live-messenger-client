import styled from "styled-components";
import Message from "./Message";
import MessagesSkeleton from "../Skeleton/MessagesSkeleton";

const MessageContainerStyles = styled.div`
  padding: 0 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  background-color: var(--background-light);
  &::-webkit-scrollbar {
      display: none;
    }
`;

export default function MessageContainer({messages, isLoading}) {
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
      {isLoading ? (
        <MessagesSkeleton count={10} />
      ) : (
        messages && messages.length > 0 ?
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
      )
      
      }
    </MessageContainerStyles>
  )
}