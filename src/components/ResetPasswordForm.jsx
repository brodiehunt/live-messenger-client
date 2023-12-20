import useForm from '../hooks/UseForm';
import InputField from './InputField';
import FormButton from './FormButton';
import FormStyles from './styles/Form';
import { useQuery } from '../hooks/useQuery';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { passwordReset } from '../services/authServices';

const ResetPasswordForm = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [token, setToken ] = useState(null);
  const navigate = useNavigate();
  const query = useQuery();
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
  } = useForm({ password: ''});

  useEffect(() => {
    const token = query.get('token');

    // if (!token) {
    //   navigate('/request-reset');
    // }
    setToken(token)
  }, [])

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateSubmit('reset-password')) return null;
    
    setIsLoading(true);
    setServerErrors(null);
    
    try {
      console.log(token)
      const requestInfo = {
        ...inputs, 
        token: token
      }
      console.log(requestInfo)
      const response = await passwordReset(requestInfo);
      setSuccessMessage(true)
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
        <div className="server-success">
          Wohoo! Password successfully reset! Sign in 
          <Link to="/signin" className="inline-link"> here.</Link>
        </div>
      }
      <InputField
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        value={inputs.password}
        errorMessage={inputErrors.password}
        onChange={handleChange}
        onBlur={handleBlur}
        elRef={fieldRefs.password}
        disabled={isLoading}
      >
        Password
      </InputField>
      <FormButton
        disabled={isLoading}
      >
        Reset Password
      </FormButton>
    </FormStyles>
  )
}

export default ResetPasswordForm;