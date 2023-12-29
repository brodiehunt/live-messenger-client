import styled from 'styled-components';
import { FaUserPlus } from "react-icons/fa";

const MutualFriendItemStyles = styled.div`
  display: flex;
  align-items: center;
  /* gap: 2rem; */
  width: 100%;

  .avatar-container {
    margin-right: 2rem;
  }

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .username {
    font-weight: 600;
  }

  button.mutual-friends {
    border: none;
    color: var(--primary);
    text-decoration: underline;
    background: none;
    cursor: pointer;
    transition: 0.2s ease-in all;
  }

  button.add-user {
    border: none;
    color: var(--primary);
    text-decoration: underline;
    background: none;
    margin-left: auto;
    margin-right: 2rem;
    cursor: pointer;
    transition: 0.2s ease-in all;
  }

  button.mutual-friends:hover, 
  button.mutual-friends:active,
  button.add-user:hover,
  button.add-user:active {
    color: var(--primary-hover);
  }

  .add-icon {
    width: 20px;
    height: 20px
  }
  @media (min-width: 1000px) {
    /* width: 50%; */
  }
`

export default function MutualFriendItem({
  user, 
  count, 
  handleAddFriend,
  setMutualFriendModal
}) {

  return (
    <MutualFriendItemStyles>
      <div className="avatar-container">
        <img src={user.avatarUrl} />
      </div>
      <div>
        <div className="username">{user.username}</div>
        <button 
          onClick={() => setMutualFriendModal(user._id)}
          className="mutual-friends"
        >
          {count} mutual friends
        </button>
      </div>
      <button 
        className="add-user"
        onClick={() => handleAddFriend(user._id)}
      >
        <FaUserPlus className='add-icon'/>
      </button>
    </MutualFriendItemStyles>
  )
}