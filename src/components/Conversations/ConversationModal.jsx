import ConversationModalStyles from "../styles/Conversation/ConversationModalStyles";
import { IoClose } from "react-icons/io5";

export default function ConversationModal({
  setSettingsModal,
  participants,
  groupMetaData,
}) {
  const groupAdminInfo = participants.filter((participant) => {
    return groupMetaData.groupAdmins.includes(participant._id);
  });

  return (
    <ConversationModalStyles>
      <div className="header">
        <h2>Settings</h2>
        <button onClick={() => setSettingsModal(false)}>
          <IoClose />
        </button>
      </div>
      <div className="admins">
        <h3>Group Admins</h3>
        {groupAdminInfo &&
          groupAdminInfo.map((info) => {
            return (
              <div key={info._id} className="item">
                <img src={info.avatarUrl} />
                {info.username}
              </div>
            );
          })}
      </div>
      <div className="Members">
        <h3>Members</h3>
        {participants &&
          participants.map((participant) => {
            return (
              <div key={participant._id} className="item">
                <img src={participant.avatarUrl} />
                {participant.username}
              </div>
            );
          })}
      </div>
    </ConversationModalStyles>
  );
}
