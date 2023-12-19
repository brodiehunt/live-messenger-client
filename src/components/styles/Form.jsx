import styled, { keyframes } from 'styled-components';

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

const FormStyles = styled.form`
  width: calc(100% - 2rem);
  max-width: 550px;
  margin: 2rem auto;
  margin-top: 0;
  padding: 1rem;
  /* box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.1); */
  border-radius: 3px;

  &::before {
      height: 10px;
      margin-bottom: 2rem;
      display: ${props => props.$loading ? 'block' : 'none'};
      content: '';
      background-image: linear-gradient(
        to right,
        var(--secondary-hover) 0%,
        var(--primary-hover) 50%,
        var(--secondary-hover) 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
`

export default FormStyles;