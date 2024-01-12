import {
  SearchContactsInputStyles,
  LoadingBar,
} from "../styles/NewConversation/SearchContactsStyles";
import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import useDebounce from "../../hooks/useDebounce";
import { findFriendsByUsername } from "../../services/friendServices";

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
