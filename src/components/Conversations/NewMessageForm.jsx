import styled from "styled-components"
import { LuSendHorizonal } from "react-icons/lu";
import {useState} from 'react';
import { sendMessage } from "../../services/conversationServices";
const NewMessageFormStyles = styled.div`
  margin-top: auto;
  background-color: white;
  padding: 2rem 1rem;

  form {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    textarea {
      flex-grow: 1;
      min-height: 50px;  /* Minimum height */
      max-height: 200px; /* Maximum height */
      overflow-y: auto;
      color: var(--text-dark);
      padding: 0.8rem;
      font-size: 1rem;
      font-family: 'Red Hat Display', sans-serif;
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
`

export default function NewMessageForm({
  addNewMessage,
  conversationId
}) {
  const [input, setInput] = useState({message: ''});

  const handleChange = (event) => {
    const {name, value} = event.target;

    setInput({[name]: value})
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (!input.message) {
      return
    }
    try {
      const newMessage = await sendMessage(conversationId, input);
      addNewMessage(newMessage);
    } catch(error) {
      console.log(error)
    }
    setInput({message: ''});
  }

  return (
    <NewMessageFormStyles>
      <form 
        onSubmit={onSubmit}
      >
        <textarea
        id="message"
        name="message"
        value={input.message}
        onChange={handleChange}
        placeholder="Type your message here"
        >

        </textarea>
        <button 
          type="submit"
        >
          <LuSendHorizonal />
        </button>
      </form>
    </NewMessageFormStyles>
  )
}