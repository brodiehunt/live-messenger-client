import styled, {keyframes} from 'styled-components';
import useForm from '../hooks/UseForm';
import InputField from './InputField';
import FormButton from './FormButton';
import { validateRegister } from '../utils/formValidation';
import FormStyles from './styles/Form';


const RegisterForm = () => {
  const {
    inputs,
    inputErrors,
    setInputErrors,
    fieldRefs,
    isLoading,
    setIsLoading,
    serverErrors,
    handleChange,
    validateSubmit,
    handleBlur,
    resetForm,
  } = useForm({name: '', username: '', email: '', password: '', passwordConfirm: ''});

  function handleSubmit(event) {
    event.preventDefault()
    if (!validateSubmit('register')) return null;
    setIsLoading(true)
    console.log('handled submit');
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
        <div>Server error</div>
      }
      <InputField
        type="text"
        name="name"
        id="name"
        placeholder="Enter your name"
        value={inputs.name}
        errorMessage={inputErrors.name}
        onChange={handleChange}
        onBlur={handleBlur}
        elRef={fieldRefs.name}
        disabled={isLoading}
      >
        Name
      </InputField>

      <InputField
        type="text"
        name="username"
        id="username"
        placeholder="Enter your username"
        value={inputs.username}
        errorMessage={inputErrors.username}
        onChange={handleChange}
        onBlur={handleBlur}
        elRef={fieldRefs.username}
        disabled={isLoading}
      >
        Username
      </InputField>
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
      <InputField
        type="password"
        name="passwordConfirm"
        id="passwordConfirm"
        placeholder="Confirm your password"
        value={inputs.passwordConfirm}
        errorMessage={inputErrors.passwordConfirm}
        onChange={handleChange}
        onBlur={handleBlur}
        elRef={fieldRefs.passwordConfirm}
        disabled={isLoading}
      >
        Confirm Password
      </InputField>
      <FormButton
        disabled={isLoading}
      >
        Register
      </FormButton>
    </FormStyles>
  )
}

export default RegisterForm;