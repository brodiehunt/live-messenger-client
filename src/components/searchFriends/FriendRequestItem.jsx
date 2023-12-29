import styled from 'styled-components';
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const FriendRequeststItemStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  /* margin-top: 1rem; */
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

`;

const RequestItem = ({
  user, 
  friendshipId, 
  type,
  handleDelete,
  handleAccept
}) => {

  return (
    <FriendRequeststItemStyles>
       <div className="avatar-container">
        <img src={user.avatarUrl} alt={`${user.name}'s avatar`}/>
      </div>
      <div className="user-username">
        {user.username}
      </div>
      <div className="buttons-container">
        {type === 'recieved' &&
          <button
          onClick={() => handleAccept(friendshipId, user.username)}
        >
          <FaCheck className="button-icon" />
        </button>
        }
        <button
          onClick={() => handleDelete(friendshipId, type)}
        >
          <IoClose className="button-icon" />
        </button>
      </div>
    </FriendRequeststItemStyles>
  )
}

export default RequestItem;