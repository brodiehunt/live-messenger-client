import styled, { keyframes } from "styled-components";

const buttonHover = keyframes`
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
`;

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

// const loading = keyframes`
//   0%, 100% {
//     left: 0
//   }
//   50% {
//     left: 80%;
//   }
// `

const AccountDetailsFormStyles = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
  max-width: 700px;
  .form-group {
    width: 100%;
  };

  label {
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--primary);
    text-transform: capitalize;
  }

  input {
    color: var(--text-dark);
    width: 100%;
    padding: 0.8rem;
    padding-right: 3rem;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid rgba(135, 135, 157, 0.6);
    border-radius: 0.2rem 0.2rem 0 0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    outline: none;
  }

  input.error {
    border-bottom: 1px solid var(--error-red);
  }

  input:focus {
    border-bottom: 2px solid var(--primary);
    outline: none;
  }

  .progress-loading {
    height: 5px;
    width: 100%;
    position: relative;
    background-image: linear-gradient(
        to right,
        var(--secondary-hover) 0%,
        var(--primary-hover) 50%,
        var(--secondary-hover) 100%
      );
    background-size: 50% auto;
    animation: ${loading} 0.5s linear infinite;
  }

  .error-message {
    font-size: 0.8rem;
    color: var(--error-red);
    margin-top: 0.2rem;

  }

  button {
    border: none;
    outline: none;
    background-color: none;
    background: none;
    align-self: end;
    margin-bottom: 0.2rem;
    transition: 0.2s ease-in all;
    position: absolute;
    right: 1rem;;
    top: 2.1rem;
    .button-icon {
      width: 25px;
      height: 25px;
      color: var(--primary);
    }
  }

  button:hover {
    scale: 1.1;
    animation: ${buttonHover} 0.3s linear 2;
    cursor: pointer;
  }

  button:focus {
    outline: 1px solid var(--primary);  
    box-shadow: 0px 2px 10px rgba(77, 150, 169, 0.4);    
  }

`

export default AccountDetailsFormStyles;