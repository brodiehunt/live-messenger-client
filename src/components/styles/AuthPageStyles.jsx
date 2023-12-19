import styled from 'styled-components';

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
    margin-bottom: 5rem;
  }

  .inline-link {
    font-weight: 600;
    color: var(--secondary);
  }
  .inline-link:hover,
  .inline-link:focus {
    text-decoration: underline;
  }
`;

export default AuthPageStyles;