import { useState, useEffect } from 'react';
import { deleteFriend, getFriends } from '../../services/friendServices';
import styled from 'styled-components';
import FriendItem from './FriendItem';

const CurrentFriendshipsStyles = styled.div`
  padding: 1rem 2rem;

  .letter-group {
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 0.5rem;
  }
`;

export default function CurrentFriendships() {
  const [friendships, setFriendships] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friends = await getFriends();
        // Sort friends
        const friendsHash = createAlphabetizedArr(friends);
    
        setFriendships(friendsHash);
      } catch(error) {
        setError('Error getting your friendships, try again later.');
      }
    }

    fetchFriends();
  }, []);

  async function handleDeleteFriend(userId, username){

    try {
      const response = await deleteFriend(userId);
      // Find the friendship in the hash and delete it: 
      const updatedUsers = friendships[username.charAt(0)].filter((user) => user._id !== userId);

      if (updatedUsers.length === 0) {
        const newFriendships = {...friendships};
        delete newFriendships[username.charAt(0)];
        setFriendships(newFriendships);
      } else {
        setFriendships({...friendships, [username.charAt(0)]: updateUsers});
      }

    } catch(error) {
      setError('Could not delete request, try again later');
    }
  }

  const createAlphabetizedArr = (friendsArr) => {
    const hash = {};
    friendsArr.forEach((friend) => {
      if (hash.hasOwnProperty(friend.username.charAt(0))) {
        hash[friend.username.charAt(0)].push(friend);
      } else {
        hash[friend.username.charAt(0)] = [friend];
      }
    })
    return hash;
  }

  const createFriendshipContacts = (friendsHash) => {
    return Object.keys(friendsHash).map((key) => {
      return (
        <div className="letter-group" key={key}>
          <h2 key={key}>{key}</h2>
          {friendsHash[key].map((friend) => {
            return (
              <FriendItem 
                key={friend._id} 
                friend={friend} 
                handleDeleteFriend={handleDeleteFriend}
              />

            )
          })}
        </div>
      )
    })
  }

  return (
    <CurrentFriendshipsStyles>
      {friendships && 
        createFriendshipContacts(friendships)
      }
    </CurrentFriendshipsStyles>
  )
}