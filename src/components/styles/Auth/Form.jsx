import styled, { keyframes } from "styled-components";

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

const FormStyles = styled.form`
  width: calc(100% - 2rem);
  max-width: 550px;
  margin: 2rem auto;
  margin-top: 0;
  padding: 1rem;
  border-radius: 3px;

  .server-error {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--error-red);
    margin-bottom: 1rem;
    padding: 0.5rem 0.8rem;
    border: 1px solid var(--error-red);
    border-radius: 0.3rem;
    background-color: rgba(255, 0, 0, 0.1);
  }

  .server-success {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 1rem;
    padding: 0.5rem 0.8rem;
    border: 1px solid var(--success-green);
    border-radius: 0.3rem;
    background-color: rgba(0, 255, 0, 0.1);
  }

  &::before {
    height: 10px;
    margin-bottom: 2rem;
    display: ${(props) => (props.$loading ? "block" : "none")};
    content: "";
    background-image: linear-gradient(
      to right,
      var(--secondary-hover) 0%,
      var(--primary-hover) 50%,
      var(--secondary-hover) 100%
    );
  }
  &[aria-busy="true"]::before {
    background-size: 50% auto;
    animation: ${loading} 0.5s linear infinite;
  }
`;

export default FormStyles;
