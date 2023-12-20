import useForm from '../hooks/UseForm';
import InputField from './InputField';
import FormButton from './FormButton';
import FormStyles from './styles/Form';
import { registerUserLocal } from '../services/authServices';

const RegisterForm = () => {
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
    validateSubmit,
    handleBlur,
    resetForm,
  } = useForm({name: '', username: '', email: '', password: '', passwordConfirm: ''});

  async function handleSubmit(event) {
    event.preventDefault()
    // if (!validateSubmit('register')) return null;
    setIsLoading(true)
    setServerErrors(null);
    try {
      const response = await registerUserLocal(inputs);
      console.log('this is the handlesubmit', response);
      setIsLoading(false);
    } catch(error) {
      if (error.response) {
        if (error.response.status === 422) {                              // inline validation errors
          setInputErrors({...inputErrors, ...error.response.data.error});
        } else {                                                          // other server produced errors (conflict etc)
          setServerErrors(error.response.data.error);
        }
      } else if (error.request) {                                        // network errors - no response from server
        setServerErrors(`${error.message}. Try again later`);
      } else {
        // Something else happened (on the client ? go to error page)
        console.log('something random', error)
      }
      setIsLoading(false);
    }
  }

  return (
    <FormStyles 
      role="form"
      onSubmit={handleSubmit}
      aria-busy={isLoading}
      $loading={isLoading}
    >
      {serverErrors && 
        <div className="server-error">{serverErrors}</div>
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