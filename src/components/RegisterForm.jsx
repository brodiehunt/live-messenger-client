import styled, {keyframes} from 'styled-components';
import useForm from '../hooks/UseForm';
import InputField from './InputField';
import FormButton from './FormButton';
import { validateRegister } from '../utils/formValidation';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const RegisterFormStyles = styled.form`
  width: calc(100% - 2rem);
  max-width: 550px;
  margin: 2rem auto;
  margin-top: 0;
  padding: 1rem;
  /* box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.1); */
  border-radius: 3px;

  &::before {
      height: 10px;
      margin-bottom: 2rem;
      display: ${props => props.$loading ? 'block' : 'none'};
      content: '';
      background-image: linear-gradient(
        to right,
        var(--secondary-hover) 0%,
        var(--primary-hover) 50%,
        var(--secondary-hover) 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
`

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
    handleBlur,
    resetForm,
  } = useForm({name: '', username: '', email: '', password: '', passwordConfirm: ''});

  function handleSubmit(event) {
    event.preventDefault()

     // Runs all validation functions - returns inputErrors shaped object with new errors
     const newInputErrors = validateRegister(inputs);

     // Finds and returns first key (feild name) that has an error
     const firstErrorField = Object.keys(newInputErrors).find(field => newInputErrors[field]);
 
     // Sets focus on first error element - sets errorState (in case submit without touching feilds)
     if (firstErrorField && fieldRefs[firstErrorField].current) {
       fieldRefs[firstErrorField].current.focus();
       return setInputErrors(newInputErrors);
     }
    setIsLoading(true)
    console.log('handled submit');
    setTimeout(() => {
      setIsLoading(false);
    }, 5000)
  }

  return (
    <RegisterFormStyles 
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
    </RegisterFormStyles>
  )
}

export default RegisterForm;