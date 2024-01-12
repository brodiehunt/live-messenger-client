import styled from "styled-components";

const FriendItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 0;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .username {
    font-weight: 600;
    font-size: 1.25rem;
  }

  .button-group {
    margin-left: auto;
    display: flex;
    gap: 1rem;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;

    svg {
      color: var(--primary);
      width: 25px;
      height: 25px;
    }
  }

  button:hover,
  button:focus {
    svg {
      color: var(--primary-hover);
    }
  }
`;

export default FriendItemStyles;
