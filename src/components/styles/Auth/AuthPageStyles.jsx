import styled from "styled-components";

const AuthPageStyles = styled.div`
  min-height: 100svh;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    margin-bottom: 1rem;
    color: var(--text-dark);
  }
  .prompt {
    text-align: center;
  }

  .prompt.bottom {
    margin-bottom: 3rem;
  }

  .inline-link {
    font-weight: 600;
    color: var(--secondary);
  }
  .inline-link:hover,
  .inline-link:focus {
    text-decoration: underline;
  }

  .google-btn-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 4rem;
    gap: 1rem;
    font-weight: 500;
  }

  .button {
    font-size: 1rem;
    font-weight: 900;
    padding: 0.5rem 1.5rem;
    border-radius: 1.8125rem;
    outline: none;
    border: none;
    color: var(--background-light);
    background-color: var(--primary);
    transition: 0.2s ease-in all;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: var(--primary-hover);
      box-shadow: 0 4px 8px 0 rgba(133, 95, 177, 0.4);
    }

    &:focus {
      outline: 2px solid var(--primary);
    }
  }
`;

export default AuthPageStyles;
