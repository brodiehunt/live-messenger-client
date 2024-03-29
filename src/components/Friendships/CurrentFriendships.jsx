import { useState, useEffect, useContext } from "react";
import { deleteFriend, getFriends } from "../../services/friendServices";
import FriendItem from "./FriendItem";
import SearchBar from "../SearchBar";
import { useToast } from "../../hooks/useToast";
import { createConversation } from "../../services/conversationServices";
import AppContext from "../../hooks/StateContext";
import { Link, useNavigate } from "react-router-dom";
import RequestSkeleton from "../Skeleton/RequestSkeleton";
import {
  CurrentFriendshipsStyles,
  ErrorContainerStyles,
} from "../styles/Friendships/CurrentFriendshipsStyles";

export default function CurrentFriendships() {
  const [friendships, setFriendships] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const { ToastComponent, activateToast } = useToast();
  const navigate = useNavigate();
  const { store, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friends = await getFriends();
        // Sort friends
        const friendsHash = createAlphabetizedArr(friends);

        setFriendships(friendsHash);
      } catch (error) {
        setError("Error getting your friendships, try again later.");
      }
      setIsLoading(false);
    };

    fetchFriends();
  }, []);

  function insertSortedImmutable(array, newItem) {
    // Find the index where the new item should be inserted
    const index = array.findIndex(
      (item) => new Date(item.updatedAt) < new Date(newItem.updatedAt)
    );

    if (index === -1) {
      // If no such index is found, the new item is the latest and should be added at the end
      return [...array, newItem];
    } else {
      // Create a new array with the new item inserted at the found index
      return [...array.slice(0, index), newItem, ...array.slice(index)];
    }
  }

  async function handleDeleteFriend(userId, username) {
    try {
      const response = await deleteFriend(userId);
      // Find the friendship in the hash and delete it:
      const firstLetter = username.charAt(0).toLowerCase();
      const updatedUsers = friendships[firstLetter].filter(
        (user) => user._id !== userId
      );

      if (updatedUsers.length === 0) {
        const newFriendships = { ...friendships };
        delete newFriendships[firstLetter];
        setFriendships(newFriendships);
      } else {
        setFriendships({ ...friendships, [firstLetter]: updatedUsers });
      }
      activateToast(
        "Friendship delete.",
        `${username} has been removed from your friends.`,
        "success"
      );
    } catch (error) {
      activateToast(
        "Error",
        `There was an error removing ${username} as a friend. Try later`,
        "error"
      );
    }
  }

  async function handleNewMessage(userId, username) {
    try {
      const conversationResponse = await createConversation([userId]);
      const newConversation = conversationResponse.data.data;
      // if conversation is created (not existing already)
      if (conversationResponse.status === 201) {
        const newConversationsState = insertSortedImmutable(
          store.conversations,
          newConversation
        );

        dispatch({
          type: "setConversations",
          data: newConversationsState,
        });
      }

      return navigate(`/${store.user._id}/conversation/${newConversation._id}`);
    } catch (error) {
      activateToast(
        "Error",
        `Can not message ${username} right now. Try later`,
        "error"
      );
    }
  }

  const createAlphabetizedArr = (friendsArr) => {
    // Make hash keys lower case/
    const hash = {};
    friendsArr.forEach((friend) => {
      const firstLetter = friend.username.charAt(0).toLowerCase();

      if (hash.hasOwnProperty(firstLetter)) {
        hash[firstLetter].push(friend);
      } else {
        hash[firstLetter] = [friend];
      }
    });
    return hash;
  };

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
                handleNewMessage={handleNewMessage}
              />
            );
          })}
        </div>
      );
    });
  };

  const handleSearchChange = (value) => {
    setSearchVal(value);
  };

  const findMatchingFriends = () => {
    const firstLetter = searchVal.charAt(0).toLowerCase();

    if (friendships.hasOwnProperty(firstLetter)) {
      // further filterin
      const arrayOfFriends = [...friendships[firstLetter]];
      const matchingFriends = arrayOfFriends.filter((friend) => {
        const searchValCopy = searchVal.toLowerCase();
        const friendUsername = friend.username.toLowerCase();

        return friendUsername.match(searchValCopy);
      });

      return matchingFriends.map((friend) => {
        return (
          <FriendItem
            key={friend._id}
            friend={friend}
            handleDeleteFriend={handleDeleteFriend}
            handleNewMessage={handleNewMessage}
          />
        );
      });
    } else {
      <div>No matching Friends</div>;
    }
  };

  if (error) {
    return (
      <ErrorContainerStyles className="error-container">
        <h2>Oops!</h2>
        <div>{error}</div>
      </ErrorContainerStyles>
    );
  }

  return (
    <CurrentFriendshipsStyles>
      <ToastComponent />
      <SearchBar
        name="search"
        placeholder="Search your friends"
        value={searchVal}
        label="Search your Friends"
        handleChange={handleSearchChange}
      />
      {isLoading ? (
        <div className="letter-group">
          <RequestSkeleton count={10} />
        </div>
      ) : !searchVal && friendships ? (
        Object.keys(friendships).length ? (
          createFriendshipContacts(friendships)
        ) : (
          <div className="no-friends-container">
            You don't have any friend yet!.
            <Link to={`/${store.user._id}/search-friends`}>Find Friends</Link>
          </div>
        )
      ) : (
        <div className="search-container">
          <header>
            <h2>Top results</h2>
            <button onClick={() => setSearchVal("")}>Cancel Search</button>
          </header>
          <div className="results-container">{findMatchingFriends()}</div>
        </div>
      )}
    </CurrentFriendshipsStyles>
  );
}
