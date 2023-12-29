import {useState, useEffect} from 'react';
import { getLikelyFriends, sendRequest } from '../../services/friendServices';
import styled from 'styled-components';
import MutualFriendItem from './MutualFriendItem';
const PeopleYouMayKnowStyles = styled.div`
  padding: 1rem;

  h2 {
    margin-bottom: 1rem;
  }

  .results-container {
    margin-top: 0.5rem;
    min-height: 60px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 1.5rem;
  }

  .no-suggestions {
    text-align: center;
    margin-top: 2rem;
  }

  @media (min-width: 450px) {
    .results-container {
      flex-direction: row;
    }
  }
`;

export default function PeopleYouMayKnow({
  addNewSentFriendship,
  activateToast,
  setMutualFriendModal
}) {
  const [mutualFriends, setMutualFriends] = useState([]);
  const visibleFriends = mutualFriends.slice(0, 6);
  useEffect(() => {
    const fetchMutualFriends = async () => {
      try {
        const potentialFriends = await getLikelyFriends();
        setMutualFriends(potentialFriends);
        console.log(potentialFriends);
      } catch(error) {
        console.log('error', error);
      }
    }

    fetchMutualFriends();
  }, []);

  async function handleAddFriend(userId) {

    try {
      const newFriendshipRequest = await sendRequest(userId);
      addNewSentFriendship(newFriendshipRequest);
      activateToast('Request Sent', `Friendship request sent to ${newFriendshipRequest.userDetails.username}`, 'success');
      const filteredMutualFriends = [...mutualFriends].filter((item) => {
        return item.userInfo._id !== userId;
      })
      setMutualFriends(filteredMutualFriends);
    } catch(error) {
      console.log(error);
      activateToast('Error', 'Could not sent request.', 'error')
    }
  };

  return (
    <PeopleYouMayKnowStyles>
      <h2>People you may know</h2>
      <div className="results-container">
        {mutualFriends.length > 0 ?
          ( 
            visibleFriends.map((mutualFriend) => {
              return (
                <MutualFriendItem 
                  key={mutualFriend._id} 
                  user={mutualFriend.userInfo}
                  count={mutualFriend.mutualFriendsCount}
                  handleAddFriend={handleAddFriend}
                  setMutualFriendModal={setMutualFriendModal}
                />)
            })
            
            
          ) : (
            <div className="no-suggestions">No suggestions. Try adding some users first.</div> 
          )
        }
      </div>
    </PeopleYouMayKnowStyles>
  )
};
