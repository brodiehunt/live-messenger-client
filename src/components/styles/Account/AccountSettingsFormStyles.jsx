import styled from "styled-components";

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
    background-color: rgba(255,0 ,0 ,0.1);
  }

  .close-error{
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
  
`;

export default AccountSettingsFormStyles;