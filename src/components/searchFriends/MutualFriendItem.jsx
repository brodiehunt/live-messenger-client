import MutualFriendItemStyles from "../styles/searchFriends/MutualFriendItemStyles";
import { FaUserPlus } from "react-icons/fa";


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