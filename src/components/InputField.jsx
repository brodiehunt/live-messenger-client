import styled from 'styled-components';

const InputField = ({
  type,
  name,
  id,
  value,
  elRef,
  onChange,
  onBlur,
  errorMessage,
  placeHolder,
  children
}) => {
  return (
    <div>
      <label 
        htmlFor="id"
      >
        {children}
      </label>
      <input 
        type={type}
        name={name}
        id={id}
        placeholder={placeHolder}
        value={value}
        ref={elRef}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errorMessage && 
        <div
          role="alert"
          aria-live="assertive"
        >
          {errorMessage}
        </div>
      }
    </div>
  )
}

export default InputField;