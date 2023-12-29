import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import FriendRequeststItemStyles from "../styles/searchFriends/FriendRequestItemStyles";

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