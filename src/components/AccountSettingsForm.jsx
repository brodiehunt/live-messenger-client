import styled from "styled-components";
import { useState } from "react";
import ToggleSwitch from './ToggleSwitch';
import FormButton from "./FormButton";
import { IoIosClose } from "react-icons/io";

const AccountSettingsFormStyles = styled.form`
  margin-bottom: 3rem;

  .error {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--error-red);
    margin-bottom: 1rem;
    padding: 0.5rem 0.8rem;
    border: 1px solid var(--error-red);
    border-radius: 0.3rem;
    background-color: rgba(255,0 ,0 ,0.1);
  }

  .close-error{
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
  
`


export default function AccountSettingsForm() {
  const [formState, setFormState] = useState({isPrivate: false, allowNonFriendMessages: true, readReceipts: true});
  const [formError, setFormError] = useState(null);

  const handleChange = (event) => {
    const {name, checked} = event.target;
    console.log(event.target.checked)
    setFormState({...formState, [name]: checked})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with toggle state:', formState);
  };

  return (
    <AccountSettingsFormStyles onSubmit={handleSubmit}>
      {formError &&
        <div className="error">
          {formError}
          <IoIosClose 
            onClick={() => setFormError(null)}
            className="close-error"
          />
        </div>
      }
      <ToggleSwitch
        name="isPrivate"
        checked={formState.isPrivate}
        handleChange={handleChange}
      >
        <h3>Account Privacy</h3>
        <p 
          className="toggle-switch-description"
        >
          Prevent your account from being searched by other users, showing up in friend recommendations or being friend requested by users you are in groups with.
        </p>
      </ToggleSwitch>
      <ToggleSwitch
        name="allowNonFriendMessages"
        checked={formState.allowNonFriendMessages}
        handleChange={handleChange}
      >
        <h3>Allow messages from anyone</h3>
        <p 
         
          className="toggle-switch-description"
        > 
          Users who are not your friend are able to message you.
        </p>
      </ToggleSwitch>
      <ToggleSwitch
        name="readReceipts"
        checked={formState.readReceipts}
        handleChange={handleChange}
      >
        <h3>Read receipts</h3>
        <p 
          
          className="toggle-switch-description"
        >
          Notify other users when you have read their messages.
        </p>
      </ToggleSwitch>
      <FormButton
        disabled={false}
      >
        Save
      </FormButton>
    </AccountSettingsFormStyles>
  );
};

