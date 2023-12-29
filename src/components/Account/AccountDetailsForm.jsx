import { useState, useRef, useContext } from "react"
import AccountDetailsFormStyles from "../styles/Account/AccountDetailsFormStyles";
import { MdSaveAlt } from "react-icons/md";
import AppContext from "../../hooks/StateContext";


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