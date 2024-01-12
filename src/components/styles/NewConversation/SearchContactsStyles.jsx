import styled, { keyframes } from "styled-components";

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

const LoadingBar = styled.div`
  height: 5px;
  position: relative;
  margin: 0 1rem;
  background-image: linear-gradient(
    to right,
    var(--secondary-hover) 0%,
    var(--primary-hover) 50%,
    var(--secondary-hover) 100%
  );
  background-size: 50% auto;
  animation: ${loading} 0.5s linear infinite;
`;

const SearchContactsInputStyles = styled.div`
  padding: 1rem;

  .results-container {
    margin: 0rem 1rem;
    background-color: white;
    padding: 1rem 0;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-height: 400px;
    overflow-y: scroll;

    .no-result {
      font-weight: 600;
    }
  }
  .search-error {
    color: var(--error-red);
    font-weight: 600;
  }

  .search-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    cursor: pointer;
  }

  .search-item:hover {
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
`;

export { SearchContactsInputStyles, LoadingBar };
