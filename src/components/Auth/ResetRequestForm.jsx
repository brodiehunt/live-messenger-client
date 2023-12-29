import useForm from '../../hooks/UseForm';
import InputField from '../InputField';
import FormButton from '../FormButton';
import FormStyles from '../styles/Auth/Form';
import { useState } from 'react';
import { requestReset } from '../../services/authServices';

const ResetRequestForm = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const {
    inputs,
    inputErrors,
    setInputErrors,
    fieldRefs,
    isLoading,
    setIsLoading,
    serverErrors,
    setServerErrors,
    handleChange,
    handleBlur,
    validateSubmit,
    resetForm,
  } = useForm({ email: ''});

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateSubmit('request-reset')) return null;
    
    setIsLoading(true);
    setServerErrors(null);
    
    try {
      const response = await requestReset(inputs);
      setSuccessMessage('Success! Go to your email to reset you password.')
      console.log(response);
    } catch(error) {
      if (error.response) {
        if (error.response.status === 422) {
          setInputErrors(error.response.data.error);
        } else {
          setServerErrors(error.response.data.error);
        }
      } else if (error.request) {
        setServerErrors(`${error.message}. Try again later`);
      } else {
        console.log('Some whack error i havent considered');
      }
    }
    setIsLoading(false);
  }

  return (
    <FormStyles
      onSubmit={handleSubmit}
      aria-busy={isLoading}
      $loading={isLoading}
    >
      {serverErrors && 
        <div className="server-error">{serverErrors}</div>
      }
      {successMessage && 
        <div className="server-success">{successMessage}</div>
      }
      <InputField
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email"
        value={inputs.email}
        errorMessage={inputErrors.email}
        onChange={handleChange}
        onBlur={handleBlur}
        elRef={fieldRefs.email}
        disabled={isLoading}
      >
        Email
      </InputField>
      <FormButton
        disabled={isLoading}
      >
        Reset Password
      </FormButton>
    </FormStyles>
  )
}

export default ResetRequestForm;