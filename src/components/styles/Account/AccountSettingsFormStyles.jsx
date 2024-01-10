import styled, { keyframes } from "styled-components";

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

const AccountSettingsFormStyles = styled.form`
  margin-bottom: 3rem;

  .error {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--error-red);
    margin-bottom: 1rem;
    padding: 0.5rem 0.8rem;
    border: 1px solid var(--error-red);
    border-radius: 0.3rem;
    background-color: rgba(255, 0, 0, 0.1);
  }

  .close-error {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }

  .progress-loading {
    height: 10px;
    width: 100%;
    max-width: 700px;
    margin-bottom: 1rem;
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
`;

export default AccountSettingsFormStyles;
