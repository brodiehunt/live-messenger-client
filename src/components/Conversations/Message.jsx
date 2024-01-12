import { useContext } from "react";
import styled from "styled-components";
import AppContext from "../../hooks/StateContext";
import { RiErrorWarningLine } from "react-icons/ri";
import { useState } from "react";
import { sendMessage } from "../../services/conversationServices";

const MessageStyles = styled.div`
  align-self: ${({ $isUserMessage }) => ($isUserMessage ? "end" : "start")};
  margin: 0.5rem 0;
  max-width: 60%;
  position: relative;

  .message-content {
    background-color: ${({ $isUserMessage, $pending }) =>
      $isUserMessage ? ($pending ? "#E5E5EA" : "var(--primary)") : "#E5E5EA"};
    color: ${({ $isUserMessage, $pending }) =>
      $isUserMessage
        ? $pending === "error"
          ? "var(--text-dark)"
          : "white"
        : "var(--text-dark)"};
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    position: relative;
    font-size: 0.9rem;
    font-weight: 500;
    width: fit-content;
    margin-left: ${({ $isUserMessage }) => ($isUserMessage ? "auto" : "")};
    margin-right: ${({ $isUserMessage }) => ($isUserMessage ? "" : "auto")};
  }

  .message-content::after {
    position: absolute;
    bottom: 0;
    right: ${({ $isUserMessage }) => ($isUserMessage ? "0" : "100%")};
    transform: translate(50%, -100%);
    content: "";
    width: 10px;
    height: 10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: ${({ $isUserMessage, $pending }) =>
      $isUserMessage
        ? $pending
          ? "10px solid #E5E5EA"
          : "10px solid var(--primary)"
        : "10px solid #E5E5EA"};
    /* border-bottom: 10px solid var(--primary); */
    border-radius: 4px;
  }

  .date {
    float: ${({ $isUserMessage }) => ($isUserMessage ? "right" : "left")};
    font-weight: 600;
    font-size: 0.7rem;
  }

  .error-button {
    border: none;
    background: none;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-150%, 50%);
  }

  .error-icon {
    color: var(--error-red);
  }
`;

export default function Message({
  message,
  updateOptimisticMessageError,
  replaceOptimisticMessage,
  conversationId,
}) {
  const { store, dispatch } = useContext(AppContext);
  const [resendLoading, setResendLoading] = useState(false);
  const user = store.user;

  const isUserMessage = message.sender === user._id ? true : false;
  const pending = message?.status;

  const formatDate = (dateString) => {
    console.log(dateString);
    const msgDate = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = msgDate.toDateString() === now.toDateString();
    const isYesterday = msgDate.toDateString() === yesterday.toDateString();

    const timeFormatted = msgDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isToday) {
      return timeFormatted;
    } else if (isYesterday) {
      return `Yesterday at ${timeFormatted}`;
    } else {
      return `${timeFormatted} ${msgDate
        .getDate()
        .toString()
        .padStart(2, "0")}/${(msgDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${msgDate.getFullYear().toString().substring(2)}`;
    }
  };

  const resendMessage = async () => {
    try {
      setResendLoading(true);
      updateOptimisticMessageError(message._id);

      // Send message to api returns with conversation (where lastMessage) is the full new message object
      const conversation = await sendMessage(conversationId, {
        message: message.content,
      });

      if (store.conversations) {
        // Filter this conversation out of context
        const filterConvo = [...store.conversations].filter((conv) => {
          return conv._id !== conversation._id;
        });
        // Re-append (so it appears first);
        const newConversations = [conversation, ...filterConvo];
        // Set context
        dispatch({
          type: "setConversations",
          data: newConversations,
        });
      }

      const newMessage = conversation.lastMessage;
      const updatedReadBy = conversation.readBy;
      // Replace optimistic message with the real one
      replaceOptimisticMessage(newMessage, updatedReadBy, message._id);
    } catch (error) {
      updateOptimisticMessageError(message._id);
    }
    setResendLoading(false);
  };

  return (
    <MessageStyles $isUserMessage={isUserMessage} $pending={pending}>
      {pending === "error" && (
        <button
          className="error-button"
          aria-label="resend message"
          type="button"
          onClick={resendMessage}
          disabled={resendLoading}
        >
          <RiErrorWarningLine className="error-icon" />
        </button>
      )}
      <div className="message-content">{message.content}</div>
      <div className="date">{formatDate(message?.createdAt || Date.now())}</div>
    </MessageStyles>
  );
}
