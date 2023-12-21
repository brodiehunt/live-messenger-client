import { useState, useRef } from "react"
import styled, { keyframes } from "styled-components";
import { MdSaveAlt } from "react-icons/md";

const buttonHover = keyframes`
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
`;

const ProfileFormStyles = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;

  .form-group {
    /* flex-grow: 1; */
    max-width: 600px;
    width: 90%;
  };

  label {
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: var(--primary);
    text-transform: capitalize;
  }

  input {
    color: var(--text-dark);
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid rgba(135, 135, 157, 0.6);
    border-radius: 0.2rem 0.2rem 0 0;
    /* background-color: rgba(242, 242, 242, 0.3); */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    outline: none;
  }

  input.error {
    border-bottom: 1px solid var(--error-red);
  }

  input:focus {
    border-bottom: 2px solid var(--primary);
    background-color: rgba(242, 242, 242, 0.3);
    outline: none;
  }

  .error-message {
    font-size: 0.8rem;
    color: var(--error-red);
    margin-top: 0.2rem;

  }

  button {
    border: none;
    outline: none;
    background-color: none;
    background: none;
    align-self: end;
    margin-bottom: 0.2rem;
    transition: 0.2s ease-in all;
    position: absolute;
    right: 0;
    top: 2.2rem;
    .button-icon {
      width: 25px;
      height: 25px;
      color: var(--primary);
    }
  }

  button:hover {
    scale: 1.1;
    animation: ${buttonHover} 0.3s linear 2;
    cursor: pointer;
  }


`

export default function ProfileForm({
  type,
  name,
  initialValue,
  validateFunc
}) {
  const [input, setInput] = useState(initialValue);
  const [inputError, setInputError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const fieldRef = useRef(null);
  

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleBlur(event) {
    setInputError(validateFunc(input));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const isInputError = validateFunc(input);
    if (isInputError) {
      setInputError(isInputError);
      return fieldRef.current.focus();
    }
    console.log('hello submit');
  }

  return (
    <ProfileFormStyles
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor={name}>{name}</label>
        <input
          id={name}
          type={type}
          name={name}
          value={input}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={fieldRef}
          className={inputError && 'error'}
        />
        {serverError && 
          <div 
            className="error-message"
            role="alert"
            aria-live="assertive"
          >
            {serverError}
          </div>
        }
        {inputError && 
          <div 
            className="error-message"
            role="alert"
            aria-live="assertive"
          >
            {inputError}
          </div>
        }
      </div>
      <button type="submit">
        <MdSaveAlt className="button-icon" />
      </button>
    </ProfileFormStyles>
  )
}