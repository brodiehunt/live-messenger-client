import styled from "styled-components";

const FriendRequestsStyles = styled.div`
  padding: 1rem 2rem;

  h2 {
    margin-bottom: 1rem;
  }

  .toggle-view {
    display: flex;
  }

  .toggle-button {
    color: var(--text-dark);
    font-weight: 600;
    font-size: 1.2rem;
    width: 50%;
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  .toggle-button.active {
    border-bottom: 4px solid var(--primary);
  }

  .toggle-button:hover {
    background-color: white;
  }

  .requests-container {
    padding-top: 1.5rem;
    min-height: 100px;
    max-height: 300px;
    overflow-y: scroll;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .requests-container::-webkit-scrollbar {
    display: none;
  }
`;

export default FriendRequestsStyles;
