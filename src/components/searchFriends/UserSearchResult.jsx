import styled from "styled-components";
import { useContext } from 'react';
import { BiMessageRounded } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import { sendRequest } from "../../services/friendServices";
import AppContext from "../../hooks/StateContext";

const UserSearchResultStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  /* cursor: pointer; */

  &:hover {
    background-color: rgba(143, 226, 249, 0.1);
  }
  .avatar-container {
    
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }

  .user-username {
    margin-right: auto;
    font-weight: 500;
    color: var(--text-dark);
  }

  .buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  } 

  button {
    background-color: none;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  button:hover {

  }

  .button-icon {
    width: 20px;
    height: 20px;
    color: var(--primary);
  }

`

export default function UserSearchResult({
  user, 
  activateToast,
  addNewSentFriendship
}){
  const {store} = useContext(AppContext);
  const loggedInUser = store.user;

  function handleNewMessage() {
    console.log('new message');
  }

  // API call to add user
  async function handleAddUser() {

    try {
      const newFriendship = await sendRequest(user._id);
      console.log('new friendship', newFriendship);
      addNewSentFriendship(newFriendship);
      activateToast('Success', 'Your friend request was sent', 'success')
    } catch(error) {
      console.log('error', error)
      activateToast('Error: could not send request', 'Try again later', 'error')
    }
  }

  return (
    <UserSearchResultStyles>
      <div className="avatar-container">
        <img src={user.avatarUrl} alt={`${user.name}'s avatar`}/>
      </div>
      <div className="user-username">
        {user.username}
      </div>
      <div className="buttons-container">
        <button
          onClick={handleNewMessage}
        >
          <BiMessageRounded className="button-icon" />
        </button>
        <button
          onClick={handleAddUser}
        >
          <FaUserPlus className="button-icon" />
        </button>
      </div>
    </UserSearchResultStyles>
  )
}

// Brody9573