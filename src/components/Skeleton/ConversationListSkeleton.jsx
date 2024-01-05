import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const ConversationListSkeletonStyles = styled.div`
  width: 100%;
  
  .link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    width: 100%;
    position: relative;
  }

  .img-container {
    position: relative;
  }

  .content {
    width: 70%;
  }

  .users {
    max-width: 100%;
  }

  .last-message {
    max-width: 100%;
  }

  .date {
    margin-top: auto;
    margin-left: auto;
  }
  
`;


export default function ConversationListSkeleton({count}) {
  const array = new Array(count).fill(' ');
  return (
    <>
      {array.map((item, index) => {
        return (
          <ConversationListSkeletonStyles key={index}>
          <div>
            <div className="link">
              <div className="img-container">
                <Skeleton circle width={35} height={35} />
              </div>
              <div className="content">
                <div className="users">
                  <Skeleton width={200} height={18} />
                </div>
                <div className="last-message">
                  <Skeleton width={120} height={12} />
                </div>
              </div>
              <div className='date'>
                <Skeleton width={35} height={12} />
              </div>
            </div>
          </div>
        </ConversationListSkeletonStyles>
        )
      })}
    </>
  )
}