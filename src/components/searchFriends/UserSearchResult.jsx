import styled from "styled-components";
import { BiMessageRounded } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";

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

export default function UserSearchResult({user}){

  function handleNewMessage() {
    console.log('new message');
  }

  function handleAddUser() {
    console.log('friend request sent');
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