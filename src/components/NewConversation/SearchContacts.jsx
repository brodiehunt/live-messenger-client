import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import useDebounce from "../../hooks/useDebounce";
import { findFriendsByUsername } from "../../services/friendServices";

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

export default function SearchContacts({ addRecipient }) {
  const [search, setSearch] = useState("");
  const debouncedVal = useDebounce(search);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // make api call
    const getUsersFromDb = async () => {
      setIsLoading(true);
      try {
        const matchedFriends = await findFriendsByUsername(debouncedVal);
        setContacts(matchedFriends);
      } catch (error) {
        setError("Error finding users");
      }
      setIsLoading(false);
    };
    if (debouncedVal !== "") {
      getUsersFromDb();
    } else {
      setContacts(null);
    }
  }, [debouncedVal]);

  function handleBlur() {
    setTimeout(() => {
      setContacts(null);
      setError(null);
    }, 200);
  }

  return (
    <SearchContactsInputStyles>
      <SearchBar
        handleChange={setSearch}
        name="searchFriends"
        placeholder="Search your Friends"
        value={search}
        label="Search for you friends to create a conversation with"
        handleBlur={handleBlur}
      />
      {isLoading && (
        <LoadingBar
          className="progress-loading"
          aria-hidden="true"
        ></LoadingBar>
      )}

      {contacts && (
        <div className="results-container">
          {contacts.length > 0 ? (
            contacts.map((userInfo) => {
              return (
                <div
                  key={userInfo.user._id}
                  className="search-item"
                  onClick={() => addRecipient(userInfo.user)}
                >
                  <div className="avatar-container">
                    <img
                      src={userInfo.user.avatarUrl}
                      alt={`${userInfo.user.name}'s avatar`}
                    />
                  </div>
                  <div className="user-username">{userInfo.user.username}</div>
                </div>
              );
            })
          ) : (
            <div className="no-result">No Friends match that name</div>
          )}
        </div>
      )}
      {error && (
        <div className="results-container">
          <span className="search-error">{error}</span>
        </div>
      )}
    </SearchContactsInputStyles>
  );
}
