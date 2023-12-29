import styled from "styled-components";
import { useEffect, useState } from 'react';
import { getMutualFriends } from "../../services/friendServices";
import { IoClose } from "react-icons/io5";

const MutualFriendModalStyles = styled.div`
  min-width: 300px;
  width: 80%;
  min-height: 300px;
  max-height: 500px;
  padding: 2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  overflow-y: scroll;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  button {
    background: none;
    border: none;

    svg {
      width: 20px;
      height: 20px;
      color: var(--primary);
    }
  }

  .mutual-friends-container {
    margin-top: 1rem;
  }

  .friend-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }

  @media (min-width: 768px) {
    position: absolute;
  }
`
export default function MutualFriendModal({
  userId,
  setMutualFriendModal
}) {
  const [mutualFriends, setMutualFriends] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMutualFriends = async () => {
      try {
        const friends = await getMutualFriends(userId);
        console.log(friends);
        setMutualFriends(friends);
      } catch(error) {
        console.log(error)
        setError('Oops, cannot get mutual friends')
      }
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