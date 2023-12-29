import styled from "styled-components";

const UserSearchResultStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  /* cursor: pointer; */

  &:hover {
    background-color: rgba(143, 226, 249, 0.1);
  }
  .avatar-container {
    
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }

  .user-username {
    margin-right: auto;
    font-weight: 500;
    color: var(--text-dark);
  }

  .buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  } 

  button {
    background-color: none;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  button:hover {

  }

  .button-icon {
    width: 20px;
    height: 20px;
    color: var(--primary);
  }

`;

export default UserSearchResultStyles;