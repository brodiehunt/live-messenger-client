import FriendItemStyles from "../styles/Friendships/FriendItemStyles";
import { BiMessageRounded } from "react-icons/bi";
import { TiUserDelete } from "react-icons/ti";

export default function FriendItem({
  friend,
  handleDeleteFriend,
  handleNewMessage,
}) {
  return (
    <FriendItemStyles>
      <img src={friend.avatarUrl} />
      <div className="username">{friend.username}</div>
      <div className="button-group">
        <button onClick={() => handleNewMessage(friend._id, friend.username)}>
          <BiMessageRounded />
        </button>
        <button onClick={() => handleDeleteFriend(friend._id, friend.username)}>
          <TiUserDelete />
        </button>
      </div>
    </FriendItemStyles>
  );
}
