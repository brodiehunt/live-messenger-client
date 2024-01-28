import { BiMessageRounded } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import { sendRequest } from "../../services/friendServices";
import UserSearchResultStyles from "../styles/searchFriends/UserSearchResultStyles";

export default function UserSearchResult({
  user,
  activateToast,
  addNewSentFriendship,
}) {
  function handleNewMessage() {
    console.log("new message");
  }

  // API call to add user
  async function handleAddUser() {
    try {
      const newFriendship = await sendRequest(user._id);
      addNewSentFriendship(newFriendship);
      activateToast("Success", "Your friend request was sent", "success");
    } catch (error) {
      activateToast(
        "Error: could not send request",
        "Try again later",
        "error"
      );
    }
  }

  return (
    <UserSearchResultStyles>
      <div className="avatar-container">
        <img src={user.avatarUrl} alt={`${user.name}'s avatar`} />
      </div>
      <div className="user-username">{user.username}</div>
      <div className="buttons-container">
        {!user.friend && (
          <button onClick={handleAddUser}>
            <FaUserPlus className="button-icon" />
          </button>
        )}
        <button onClick={handleNewMessage}>
          <BiMessageRounded className="button-icon" />
        </button>
      </div>
    </UserSearchResultStyles>
  );
}

// Brody9573
