import styled from "styled-components";

const InputFieldStyles = styled.div`
  margin-bottom: 1.5rem;
  label {
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
    color: var(--primary);
  }

  input {
    color: var(--text-dark);
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid rgba(135, 135, 157, 0.6);
    border-radius: 0.3rem;
  }

  input.error {
    border: 1px solid var(--error-red);
  }

  input::placeholder {
    color: var(--text-light);
  }

  input:focus {
    outline: 2px solid var(--primary);
  }

  .error-message {
    font-size: 0.8rem;
    color: var(--error-red);
    margin-top: 0.2rem;
  }
`;

const InputField = ({
  type,
  name,
  id,
  value,
  elRef,
  onChange,
  onBlur,
  errorMessage,
  placeholder,
  children,
  disabled,
}) => {
  return (
    <InputFieldStyles>
      <label htmlFor={id}>*{children}</label>
      <input
        className={errorMessage && "error"}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        ref={elRef}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {errorMessage && (
        <div role="alert" aria-live="assertive" className="error-message">
          {errorMessage}
        </div>
      )}
    </InputFieldStyles>
  );
};

export default InputField;
