import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

const RequestSkeletonStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  background-color: var(--background-light);
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;

  .user-username {
    margin-right: auto;
  }

  .buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;

export default function RequestSkeleton({ count }) {
  const array = new Array(count).fill(" ");

  return (
    <>
      {array.map((item, index) => {
        return (
          <RequestSkeletonStyles key={index}>
            <div className="avatar-container">
              <Skeleton circle width={35} height={35} />
            </div>
            <div className="user-username">
              <Skeleton width={150} height={18} />
            </div>
            <div className="buttons-container">
              <Skeleton width={20} height={20} />
              <Skeleton width={20} height={20} />
            </div>
          </RequestSkeletonStyles>
        );
      })}
    </>
  );
}
