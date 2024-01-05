import { useEffect, useState } from 'react';
import { getMutualFriends } from "../../services/friendServices";
import { IoClose } from "react-icons/io5";
import MutualFriendModalStyles from '../styles/searchFriends/MutualFriendModalStyles';
import MutualFriendSkeleton from '../Skeleton/MutualFriendSkeleton';

export default function MutualFriendModal({
  userId,
  setMutualFriendModal
}) {
  const [mutualFriends, setMutualFriends] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(() => {
    const fetchMutualFriends = async () => {
      await timeout(3000);
      try {
        setIsLoading(true);
        const friends = await getMutualFriends(userId);
        setMutualFriends(friends);
      } catch(error) {
        setError('Oops, cannot get mutual friends')
      }
      setIsLoading(false);
    }

    fetchMutualFriends()
  }, [])
  
  return (
    <MutualFriendModalStyles>
      <div className="header">
        <h2>Mutual Friends</h2>
        <button 
          onClick={() => setMutualFriendModal(null)}
        >
          <IoClose />
        </button>
      </div>
      <div className="mutual-friends-container">
        {error && 
          <div className="error">
            {error}
          </div>
        }
        {isLoading &&
          <MutualFriendSkeleton count={5} />
        }
        {mutualFriends &&
          mutualFriends.map((friend) => {
            return (
              <div 
                key={friend._id}
                className="friend-container">
                <img src={friend.avatarUrl}/>
                <div className="username">
                  {friend.username}
                </div>
              </div>
            )
          })
        }
      </div>
    </MutualFriendModalStyles>
  )


}