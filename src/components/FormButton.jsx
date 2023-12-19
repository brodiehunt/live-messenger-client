import styled from 'styled-components';

const ButtonStyles = styled.button`
  font-size: 1rem;
  font-weight: 900;
  padding: 0.5rem 1.5rem;
  border-radius: 1.8125rem;
  outline: none;
  border: none;
  color: var(--background-light);
  background-color: var(--secondary);
  transition: 0.2s ease-in all;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--secondary-hover);
    box-shadow: 0 4px 8px 0 rgba(133, 95, 177, 0.4);
  }

  &:focus {
    outline: 2px solid var(--secondary);
  }
`;

export default function FormButton({disabled, children}) {
  return (
    <ButtonStyles
      type="submit"
      disabled={disabled}
    >
      {children}
    </ButtonStyles>
  )
}