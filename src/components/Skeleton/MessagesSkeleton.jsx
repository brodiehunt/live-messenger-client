import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

const MessagesSkeletonStyles = styled.div`
  align-self: ${({$left}) => $left ? 'start': 'end'};
  margin: 0.5rem 0;
  max-width: 60%;
  display: flex;
  flex-direction: column;

  .message-content {
    /* background-color: ${({$isUserMessage}) => $isUserMessage ? 'var(--primary)': '#E5E5EA'}; */
    /* color: ${({$isUserMessage}) => $isUserMessage ? 'white': 'var(--text-dark)'}; */
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    position: relative;
    /* font-size: 0.9rem;
    font-weight: 500; */
    width: fit-content;
    margin-left: ${({$isLeft}) => $isLeft ? '': 'auto'};
    margin-right: ${({$isLeft}) => $isLeft ? 'auto': ''};
  }

  .date {
    align-self: ${({$left}) => $left ? 'start': 'end'};
    font-weight: 600;
    font-size: 0.7rem;
  }
`;


export default function MessagesSkeleton({count}) {
  const array = new Array(count).fill(' ');

  return (
    <>
      {array.map((item, index) => {
        return (
          <MessagesSkeletonStyles key={index} $left={index % 2}>
            <div className="messsage-content"></div>
              <Skeleton width={150} height={30} />
            <div className="date">
              <Skeleton width={50} height={12} />
            </div>
          </MessagesSkeletonStyles>
        )
      })}
    </>
  )
};
