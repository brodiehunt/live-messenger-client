import styled from "styled-components";

const MutualFriendModalStyles = styled.div`
  min-width: 300px;
  width: 80%;
  min-height: 300px;
  max-height: 500px;
  padding: 2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  overflow-y: scroll;

  &&::-webkit-scrollbar {
    display: none;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
      color: var(--primary);
    }
  }

  .mutual-friends-container {
    margin-top: 1rem;
  }

  .friend-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }

  @media (min-width: 768px) {
    position: absolute;
  }
`;

export default MutualFriendModalStyles;
