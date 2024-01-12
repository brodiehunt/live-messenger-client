import ConversationHeaderStyles from "../styles/Conversation/ConversationHeaderStyles";
import { BsThreeDots } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";

export default function ConversationHeader({
  user,
  participants,
  groupMetaData,
  setSettingsModal,
  isLoading,
}) {
  const otherUsers =
    participants &&
    participants.filter((participant) => {
      return participant._id !== user._id;
    });

  const usernames =
    otherUsers &&
    otherUsers
      .map((participant) => {
        return participant.username;
      })
      .join(", ");

  return (
    <ConversationHeaderStyles>
      {isLoading ? (
        <>
          <div className="avatar-container">
            <Skeleton circle width={35} height={35} />
          </div>
          <div className="groupName">
            <Skeleton width={250} height={20} />
          </div>
        </>
      ) : (
        <>
          <div className="avatar-container">
            <img src={otherUsers[0].avatarUrl} />
          </div>
          <div className="group-name">{usernames}</div>
          {otherUsers && otherUsers.length > 1 && (
            <button className="options" onClick={() => setSettingsModal(true)}>
              <BsThreeDots />
            </button>
          )}
        </>
      )}
    </ConversationHeaderStyles>
  );
}
