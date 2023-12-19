import useForm from '../hooks/UseForm';
import InputField from './InputField';
import FormButton from './FormButton';
import FormStyles from './styles/Form';
import { Link } from 'react-router-dom';

const SignInForm = () => {
  const {
    inputs,
    inputErrors,
    setInputErrors,
    fieldRefs,
    isLoading,
    setIsLoading,
    serverErrors,
    handleChange,
    handleBlur,
    validateSubmit,
    resetForm,
  } = useForm({ email: '', password: ''});

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateSubmit('signin')) return null;
    console.log('handled submit');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000)
  }

  return (
    <FormStyles
      onSubmit={handleSubmit}
      aria-busy={isLoading}
      $loading={isLoading}
    >
      {serverErrors && 
        <div>Server Error</div>
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