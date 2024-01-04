import { useContext } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import AppContext from '../../hooks/StateContext';

const MessageStyles = styled.div`
  align-self: ${({$isUserMessage}) => $isUserMessage ? 'end': 'start'};
  margin: 0.5rem 0;
  max-width: 60%;

  .message-content {
    background-color: ${({$isUserMessage}) => $isUserMessage ? 'var(--primary)': '#E5E5EA'};
    color: ${({$isUserMessage}) => $isUserMessage ? 'white': 'var(--text-dark)'};
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    position: relative;
    font-size: 0.9rem;
    font-weight: 500;
    width: fit-content;
    margin-left: ${({$isUserMessage}) => $isUserMessage ? 'auto': ''};
    margin-right: ${({$isUserMessage}) => $isUserMessage ? '': 'auto'};
  }

  .message-content::after {
    position: absolute;
    bottom: 0;
    right: ${({$isUserMessage}) => $isUserMessage ? '0' : '100%'};
    transform: translate(50%, -100%);
    content: '';
    width: 10px;
    height: 10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: ${({$isUserMessage}) => $isUserMessage ? '10px solid var(--primary)': '10px solid #E5E5EA'};
    /* border-bottom: 10px solid var(--primary); */
    border-radius: 4px;
  }

  .date {
    float: ${({$isUserMessage}) => $isUserMessage ? 'right' : 'left'};
    font-weight: 600;
    font-size: 0.7rem;
  }
`

export default function Message({message}) {
  const {store} = useContext(AppContext);
  const user = store.user;

  const isUserMessage = (message.sender === user._id) ? true : false;

  const formatDate = (dateString) => {
    const msgDate = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = msgDate.toDateString() === now.toDateString();
    const isYesterday = msgDate.toDateString() === yesterday.toDateString();

    const timeFormatted = msgDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'});

    if (isToday) {
      return timeFormatted;
    } else if (isYesterday) {
      return `Yesterday at ${timeFormatted}`;
    } else {
      return `${timeFormatted} ${msgDate.getDate().toString().padStart(2, '0')}/${(msgDate.getMonth() + 1).toString().padStart(2, '0')}/${msgDate.getFullYear().toString().substring(2)}`;
    }
  }
  return (
    <MessageStyles
      $isUserMessage={isUserMessage}
    >
      <div className="message-content">{message.content}</div>
      <div className="date">{formatDate(message.createdAt)}</div>
    </MessageStyles>
  )
}