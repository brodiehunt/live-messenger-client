import styled from "styled-components";
import Skeleton from 'react-loading-skeleton';


const MutualFriendSkeletonStyles = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 0.5rem;
    background-color: var(--background-light);
    padding: 0.5rem;
    border-radius: 0.25rem;

`;


export default function MutualFriendSkeleton({count}) {
  const array = new Array(count).fill(' ');
  return (
    <>
      {
        array.map((item, index) => {
          return (
            <MutualFriendSkeletonStyles key={index}>
              <Skeleton circle width={35} height={35} />
              <Skeleton width={120} height={18}/>
            </MutualFriendSkeletonStyles>
          )
        })
      }
    </>
    
  )
}