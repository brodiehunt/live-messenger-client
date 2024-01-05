import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const MayKnowSkeletonStyles = styled.div`
  display: flex;
  align-items: center;
  /* gap: 2rem; */
  width: 100%;
  background-color: var(--background-light);
  padding: 0.5rem;
  border-radius: 0.25rem;

  .avatar-container {
    margin-right: 2rem;
  }

  .add-user {
    margin-left: auto;
  }
`;

export default function MayKnowSkeleton({count}) {
  const array = new Array(count).fill(' ');

  return (
    <>
      {array.map((item, index) => {
        return (
          <MayKnowSkeletonStyles key={index}>
            <div className="avatar-container">
              <Skeleton circle width={35} height={35} />
            </div>
            <div>
              <div className="username">
                <Skeleton width={120} height={16}/>
              </div>
              <div className="mutual-friends">
                <Skeleton width={60} height={12}/>
              </div>
            </div>
            <div className="add-user">
              <Skeleton width={20} height={20}/>
            </div>
          </MayKnowSkeletonStyles>
        )
      })}
    </>
  )
}