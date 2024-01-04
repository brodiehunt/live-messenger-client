import {useState, useEffect} from 'react';
import { getLikelyFriends, sendRequest } from '../../services/friendServices';
import PeopleYouMayKnowStyles from '../styles/searchFriends/PeopleYouMayKnowStyles';
import MutualFriendItem from './MutualFriendItem';
import MayKnowSkeleton from '../Skeleton/MayKnowSkeleton';

export default function PeopleYouMayKnow({
  addNewSentFriendship,
  activateToast,
  setMutualFriendModal
}) {
  const [mutualFriends, setMutualFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const visibleFriends = mutualFriends.slice(0, 6);

  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(() => {
    const fetchMutualFriends = async () => {
      try {
        setIsLoading(true);
        await timeout(3000)
        const potentialFriends = await getLikelyFriends();
        setMutualFriends(potentialFriends);
      } catch(error) {
        console.log('error', error);
      }
      setIsLoading(false);
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
            isLoading ? (
              <MayKnowSkeleton count={6} />
            ) : (
              <div className="no-suggestions">No suggestions. Try adding some users first.</div> 
            )
          )
        }
      </div>
    </PeopleYouMayKnowStyles>
  )
};
