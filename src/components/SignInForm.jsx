import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/UseForm';
import InputField from './InputField';
import FormButton from './FormButton';
import FormStyles from './styles/Form';
import { signInUserLocal } from '../services/authServices';
import AppContext from '../hooks/StateContext';

const SignInForm = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
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
  } = useForm({ email: '', password: ''});

  async function handleSubmit(event) {
    event.preventDefault();
    setServerErrors(null);
    if (!validateSubmit('signin')) return null;
    
    setIsLoading(true);
    try {
      const response = await signInUserLocal(inputs);
      let user = response.data.data;
      console.log(response);
      dispatch({
        type: 'setUser',
        data: user
      });
      return navigate(`/${user._id}/account`);
    } catch(error) {
      if (error.response) {
        if (error.response.status === 422) {
          setInputErrors({...inputs, ...error.response.data.error})
        } else if (error.response.status === 401) {
          setServerErrors('Incorrect email or password');
        } else {
          setServerErrors(error.response.data.error);
        }
      } else if (error.request) {
        setServerErrors(error.message)
      } else {
        console.log('Some whack error i havent considered', error);
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
        Sign in
      </FormButton>
    </FormStyles>
  )
}

export default SignInForm;