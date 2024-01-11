import styled from "styled-components";
import { LuSendHorizonal } from "react-icons/lu";
import { useContext, useState } from "react";
import { sendMessage } from "../../services/conversationServices";
import AppContext from "../../hooks/StateContext";
const NewMessageFormStyles = styled.div`
  margin-top: auto;
  background-color: white;
  padding: 2rem 1rem;
  border-top: 1px solid rgba(135, 135, 157, 0.3);
  form {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    textarea {
      flex-grow: 1;
      min-height: 50px; /* Minimum height */
      max-height: 200px; /* Maximum height */
      overflow-y: auto;
      color: var(--text-dark);
      padding: 0.8rem;
      font-size: 1rem;
      font-family: "Red Hat Display", sans-serif;
      border: 1px solid rgba(135, 135, 157, 0.6);
      border-radius: 0.2rem;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      outline: none;
    }

    textarea:focus {
      border: 2px solid var(--primary);
      outline: none;
    }
  }

  button {
    border: none;
    background: none;
    cursor: pointer;

    svg {
      width: 35px;
      height: 35px;
      color: var(--primary);
    }
  }
`;

export default function NewMessageForm({ addNewMessage, conversationId }) {
  const [input, setInput] = useState({ message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { store, dispatch } = useContext(AppContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({ [name]: value });
  };

  async function onSubmit(event) {
    event.preventDefault();
    if (!input.message) {
      return;
    }
    try {
      // Also update conversation list state here
      setIsLoading(true);
      const conversation = await sendMessage(conversationId, input);
      const filterConvo = [...store.conversations].filter((conv) => {
        return conv._id !== conversation._id;
      });
      const newConversations = [conversation, ...filterConvo];

      dispatch({
        type: "setConversations",
        data: newConversations,
      });

      const newMessage = conversation.lastMessage;
      addNewMessage(newMessage);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setInput({ message: "" });
  }

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit(event);
    }
  };

  return (
    <NewMessageFormStyles>
      <form onSubmit={onSubmit}>
        <textarea
          id="message"
          name="message"
          value={input.message}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          placeholder="Type your message here"
        ></textarea>
        <button disabled={isLoading} type="submit">
          <LuSendHorizonal />
        </button>
      </form>
    </NewMessageFormStyles>
  );
}
