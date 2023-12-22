import { useState, useRef, useContext } from "react"
import styled, { keyframes } from "styled-components";
import { MdSaveAlt } from "react-icons/md";
import AppContext from "../hooks/StateContext";
const buttonHover = keyframes`
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
`;

const AccountDetailsFormStyles = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
  max-width: 700px;
  .form-group {
    /* flex-grow: 1; */
    /* max-width: px; */
    width: 100%;
  };

  label {
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--primary);
    text-transform: capitalize;
  }

  input {
    color: var(--text-dark);
    width: 100%;
    padding: 0.8rem;
    padding-right: 3rem;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid rgba(135, 135, 157, 0.6);
    border-radius: 0.2rem 0.2rem 0 0;
    /* background-color: rgba(242, 242, 242, 0.5); */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    outline: none;
  }

  input.error {
    border-bottom: 1px solid var(--error-red);
  }

  input:focus {
    border-bottom: 2px solid var(--primary);
    /* background-color: rgba(242, 242, 242, 0.3); */
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
    right: 1rem;;
    top: 2.1rem;
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

  button:focus {
    outline: 1px solid var(--primary);  
    box-shadow: 0px 2px 10px rgba(77, 150, 169, 0.4);    
  }


`

export default function AccountDetailsForm({
  type,
  name,
  initialValue,
  validateFunc,
  apiFunc
}) {
  const [input, setInput] = useState({[name]: initialValue});
  const [inputError, setInputError] = useState({ [name]: ''});
  const [serverError, setServerError] = useState(null);
  const fieldRef = useRef(null);
  const {dispatch} = useContext(AppContext);

  function handleChange(event) {
    const {name, value} = event.target;
    setInput({ [name]: value });
  }

  function handleBlur(event) {
    const {name, value} = event.target;
    setInputError({ [name]: validateFunc(value) });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setServerError(null);
    const isInputError = validateFunc(input[name]);
    if (isInputError) {
      setInputError({ [name]: isInputError });
      return fieldRef.current.focus();
    }

    // Make api call with updated data
    try {
      const response = await apiFunc(input);
      console.log('user' , response)
      let updatedUser = response.data.data;
      dispatch({
        type: 'setUser',
        data: updatedUser
      })
      console.log(updatedUser);
    } catch(error) {
      console.log('the error', error)
      // return
      if (error.response) {
        setServerError(error.response.data.error);
      }  else if (error.request) {  
        setServerError(`${error.message}. Try again later`);
      } else {
        console.log('random unexpected error', error)
      }
    }
  }

  return (
    <AccountDetailsFormStyles
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor={name}>{name}</label>
        <input
          id={name}
          type={type}
          name={name}
          value={input[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={fieldRef}
          className={inputError[name] && 'error'}
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
        {inputError[name] && 
          <div 
            className="error-message"
            role="alert"
            aria-live="assertive"
          >
            {inputError[name]}
          </div>
        }
      </div>
      <button type="submit">
        <MdSaveAlt className="button-icon" />
      </button>
    </AccountDetailsFormStyles>
  )
}