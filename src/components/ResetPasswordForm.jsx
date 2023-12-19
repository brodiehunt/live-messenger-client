import useForm from '../hooks/UseForm';
import InputField from './InputField';
import FormButton from './FormButton';
import FormStyles from './styles/Form';

const ResetPasswordForm = () => {
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
  } = useForm({ email: ''});

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateSubmit('reset')) return null;
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
      <FormButton
        disabled={isLoading}
      >
        Reset Password
      </FormButton>
    </FormStyles>
  )
}

export default ResetPasswordForm;