import styled from "styled-components";

const CurrentFriendshipsStyles = styled.div`
  .letter-group {
    margin-bottom: 2rem;
    padding: 0rem 2rem;
  }

  h2 {
    margin-bottom: 0.5rem;
  }

  .search-container {
    padding: 0rem 2rem;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    header button {
      background: none;
      border: none;
      text-decoration: underline;
      color: var(--secondary);
      cursor: pointer;
      font-size: 1rem;
    }

    header button:hover,
    header button:focus {
      color: var(--secondary-hover);
    }
  }

  .no-friends-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    font-weight: 700;

    a {
      margin-top: 2rem;
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
    }
  }
`;

const ErrorContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-weight: 700;

  div {
    font-weight: 400;
  }
`;

export { ErrorContainerStyles, CurrentFriendshipsStyles };
