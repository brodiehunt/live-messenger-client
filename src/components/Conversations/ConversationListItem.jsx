import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../hooks/StateContext";
import ConversationListItemStyles from "../styles/Conversation/ConversationListItemStyles";

export default function ConversationListItem({ conversation }) {
  const { store } = useContext(AppContext);
  const user = store.user;

  const conversationUsers = conversation.participants.filter((participant) => {
    return participant._id !== user._id;
  });

  const formatIconImg = () => {
    if (conversationUsers.length > 1) {
      return (
        <div className="img-container">
          <img className="first-img" src={conversationUsers[0].avatarUrl} />
          <img className="second-img" src={conversationUsers[1].avatarUrl} />
        </div>
      );
    } else {
      return (
        <div className="img-container">
          <img src={conversationUsers[0].avatarUrl} />
        </div>
      );
    }
  };

  // If single conv returns username of other user.
  // If group conv returns 'username1, username2';
  const formatUsernameString = () => {
    const usernameString = conversationUsers
      .map((participant) => {
        return participant.username;
      })
      .join(", ");

    return <div className="users">{usernameString}</div>;
  };

  const formatLastMessage = () => {
    return (
      <div className="last-message">
        {conversation?.lastMessage ? (
          <>
            {conversation.participants.length > 2 && (
              <span>{conversation.lastMessage.senderName}: </span>
            )}
            {conversation.lastMessage.content}
          </>
        ) : (
          "No messages yet."
        )}
      </div>
    );
  };

  const formatTime = (inputDate) => {
    const date = new Date(inputDate);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}${ampm}`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    for (let i = 2; i < 7; i++) {
      const pastDay = new Date(now);
      pastDay.setDate(pastDay.getDate() - i);
      if (date.toDateString() === pastDay.toDateString()) {
        return date.toLocaleDateString("en-US", { weekday: "short" });
      }
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const isRead = conversation.readBy.find(
    (readObj) => readObj.userId === user._id
  );

  return (
    <ConversationListItemStyles $isRead={isRead}>
      <Link to={`/${user._id}/conversation/${conversation._id}`}>
        {formatIconImg()}
        <div className="content">
          {formatUsernameString()}
          {formatLastMessage()}
        </div>
        {!isRead && <div className="unread-indicator"></div>}
        <div className="date">{formatTime(conversation.updatedAt)}</div>
      </Link>
    </ConversationListItemStyles>
  );
}
