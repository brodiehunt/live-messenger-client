import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";

const ConversationHeaderStyles = styled.div`
  padding: 1rem 2rem;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .group-name {
    font-weight: 700;
  }

  .options {
    margin-left: auto;
    display: flex; 
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;

    svg {
      width: 25px;
      height: 25px;
      color: var(--primary);
    }
  }
`;

export default function ConversationHeader({
  user, 
  participants, 
  groupMetaData,
  setSettingsModal
}) {
  const otherUsers = participants.filter((participant) => {
    return participant._id !== user._id
  });

  const usernames = otherUsers.map((participant) => {
    return participant.username
  }).join(', ');

  return (
    <ConversationHeaderStyles>
      <div className="avatar-container">
        <img
          src={otherUsers[0].avatarUrl}
        />
      </div>
      <div className="group-name">
        {usernames}
      </div>

      {otherUsers && otherUsers.length > 1 &&
        <button 
          className="options"
          onClick={() => setSettingsModal(true)}
        >
          <BsThreeDots />
        </button>
      }
      
    </ConversationHeaderStyles>
  )
}