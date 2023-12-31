import styled from "styled-components"
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from "../../hooks/StateContext";
import moment from 'moment';
const ConversationListItemStyles = styled.div`
  width: 100%;
  &:first-child {
    border-top: 1px solid rgba(135, 135, 157, 0.3);
  }

  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(135, 135, 157, 0.3);
    width: 100%;
    cursor: pointer;
  }

  .content {
    width: 70%;
  }
  .users {
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .last-message {
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .date {
    font-size: 0.6rem;
    font-weight: 800;
    margin-top: auto;
    margin-left: auto;
  }
`
export default function ConversationListItem({conversation}) {
  const {store} = useContext(AppContext);
  const user = store.user;
  const formattedDate = moment(conversation.updatedAt).format('DD/MM');
  const conversationUsers = conversation.participants.filter((participant) => {
    return participant._id !== user._id;
  }).map((participant) => {
    return participant.username
  }).join(', ');

  return (
    <ConversationListItemStyles>
      <Link to={`/${user._id}/conversation/${conversation._id}`}>
        <div className="img-container">
          <img src="/user.png"/>
        </div>
        <div className="content">
          <div className="users"> 
            {conversationUsers}
          </div>
          <div className="last-message">
            {conversation?.lastMessage ? 
              (
                conversation.lastMessage.content
              ) : (
                'No messages yet.'
              )
            }
          </div>
        </div>
        <div className="date">
          {formattedDate}
        </div>
      </Link>
    </ConversationListItemStyles>
  )
}