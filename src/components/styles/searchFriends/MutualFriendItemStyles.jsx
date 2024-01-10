import styled from "styled-components";

const MutualFriendItemStyles = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .avatar-container {
    margin-right: 2rem;
  }

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .username {
    font-weight: 600;
  }

  button.mutual-friends {
    border: none;
    color: var(--primary);
    text-decoration: underline;
    background: none;
    cursor: pointer;
    transition: 0.2s ease-in all;
  }

  button.add-user {
    border: none;
    color: var(--primary);
    text-decoration: underline;
    background: none;
    margin-left: auto;
    margin-right: 2rem;
    cursor: pointer;
    transition: 0.2s ease-in all;
  }

  button.mutual-friends:hover,
  button.mutual-friends:focus,
  button.add-user:hover,
  button.add-user:focus {
    color: var(--primary-hover);
  }

  .add-icon {
    width: 20px;
    height: 20px;
  }
`;

export default MutualFriendItemStyles;
