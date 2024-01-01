import {useState, useEffect} from 'react';
import { getLikelyFriends, sendRequest } from '../../services/friendServices';
import PeopleYouMayKnowStyles from '../styles/searchFriends/PeopleYouMayKnowStyles';
import MutualFriendItem from './MutualFriendItem';


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
