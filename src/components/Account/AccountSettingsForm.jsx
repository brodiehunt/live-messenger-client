import { useState, useContext } from "react";
import AccountSettingsFormStyles from "../styles/Account/AccountSettingsFormStyles";
import ToggleSwitch from './ToggleSwitch';
import FormButton from "../FormButton";
import { IoIosClose } from "react-icons/io";
import AppContext from "../../hooks/StateContext";
import { updateSettings } from "../../services/accountServices";


export default function AccountSettingsForm() {
  const {store, dispatch} = useContext(AppContext);
  const user = store.user;
  const [formState, setFormState] = useState({...user.accountSettings});
  const [formError, setFormError] = useState(null);
  

  const handleChange = (event) => {

    const {name, checked} = event.target;
    setFormState({...formState, [name]: checked})

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {
      const response = await updateSettings(formState);
      const updatedUser = response.data.data;
      dispatch({
        type: 'setUser',
        data: updatedUser
      })
      // Give some success message
    } catch(error) {
      if (error.response) {
        setFormError(error.response.data.error);
      } else if (response.request) {
        setFormError(`${error.message}. Try again later`)
      } else {
        console.log('random app error. navigate to error page');
      }
    }
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
        label="Make your account private"
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
        label="Allow friend messages from anyone"
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
        label="Send read receipts in messages"
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

