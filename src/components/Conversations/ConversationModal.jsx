import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const ConversationModalStyles = styled.div`
    min-width: 300px;
    width: 80%;
    min-height: 300px;
    max-height: 500px;
    padding: 2rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    overflow-y: scroll;
    
    &&::-webkit-scrollbar {
        display: none;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    button {
    background: none;
    border: none;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
      color: var(--primary);
    }
  }

  h3 {
    margin: 1rem 0;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }

  @media (min-width: 768px) {
    position: absolute;
  }
`;

export default function ConversationModal({
  setSettingsModal,
  participants,
  groupMetaData
}) {
  const groupAdminInfo = participants.filter((participant) => {
    return groupMetaData.groupAdmins.includes(participant._id)
  })

  return (
    <ConversationModalStyles>
      <div className="header">
        <h2>Settings</h2>
        <button
          onClick={() => setSettingsModal(false)}
        >
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
            )
          })
        }
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
            )
          })
        }
      </div>
    </ConversationModalStyles>
  )
}
