import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";

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
  setSettingsModal,
  isLoading
}) {
  
  const otherUsers = participants && participants.filter((participant) => {
    return participant._id !== user._id
  });

  const usernames = otherUsers && otherUsers.map((participant) => {
    return participant.username
  }).join(', ');

  return (
    <ConversationHeaderStyles>
      {
        isLoading ? (
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
        </>
        )
      }
      
      
    </ConversationHeaderStyles>
  )
}