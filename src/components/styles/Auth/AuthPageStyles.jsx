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
`;

export default AuthPageStyles;
