import styled from "styled-components";
import { LuSendHorizonal } from "react-icons/lu";
import { useContext, useState } from "react";
import { sendMessage } from "../../services/conversationServices";
import AppContext from "../../hooks/StateContext";
import { v4 as uuidv4 } from "uuid";
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

export default function NewMessageForm({
  addNewMessage,
  conversationId,
  replaceOptimisticMessage,
  updateOptimisticMessageError,
}) {
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
    // Optimistic message id. Defined here because needed in catch block
    const optimisticId = uuidv4();
    try {
      setIsLoading(true);

      // Construct optimistic message

      const optimisticMessage = {
        _id: optimisticId,
        content: input.message,
        sender: store.user._id,
        createdAt: Date.now(),
        status: "pending",
      };
      console.log(optimisticMessage.createdAt);
      // Append to the dom
      addNewMessage(optimisticMessage);
      const copyInput = { ...input };
      setInput({ message: "" });
      // Send message to api returns with conversation (where lastMessage) is the full new message object
      const conversation = await sendMessage(conversationId, copyInput);

      // Filter this conversation out of context
      if (store.conversations) {
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

      console.log(conversation.lastMessage);
      const newMessage = conversation.lastMessage;
      const updatedReadBy = conversation.readBy;
      // Replace optimistic message with the real one
      replaceOptimisticMessage(newMessage, updatedReadBy, optimisticId);
    } catch (error) {
      console.log(error);
      // Find an update the optimistic message in the ui.
      updateOptimisticMessageError(optimisticId);
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
