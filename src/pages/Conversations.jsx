import Profile from "../components/Profile";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import ConversationsList from "../components/Conversations/ConversationsList";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../hooks/StateContext";
import FilteredConversationList from "../components/Conversations/FilteredConversationList";

const ConversationsStyles = styled.div`
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 375px;
    min-width: 375px;
  }
`;
export default function Conversations({ user }) {
  // Implement search in this function. This way you can conditionally render the search results vs the actual conversations.
  const [searchVal, setSearchVal] = useState("");
  const debouncedVal = useDebounce(searchVal);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [returnedConversations, setReturnedConversations] = useState(null);
  const { store } = useContext(AppContext);

  useEffect(() => {
    // Write a func that
    const fetchConversations = async () => {
      const matchingConversations = store.conversations.filter(
        (conversation) => {
          // If the debounced val matches any of the usernames of participants. return the conversation.
          const usernameFound = conversation.participants.find(
            (participant) => {
              if (participant._id !== store.user._id) {
                const lowerCaseUsername = participant.username.toLowerCase();
                return lowerCaseUsername.startsWith(debouncedVal.toLowerCase());
              }
              return false;
            }
          );
          return usernameFound;
        }
      );

      setReturnedConversations(matchingConversations);
    };

    if (debouncedVal !== "") {
      fetchConversations();
    } else {
      setReturnedConversations(null);
    }
  }, [debouncedVal]);

  console.log(returnedConversations);

  return (
    <ConversationsStyles>
      <Profile user={user} />
      <Nav user={user} />
      <SearchBar
        handleChange={setSearchVal}
        name="searchConversations"
        placeholder="Search conversations"
        value={searchVal}
        label="Search your conversations"
      />
      {returnedConversations ? (
        <FilteredConversationList conversations={returnedConversations} />
      ) : (
        <ConversationsList user={user} />
      )}
    </ConversationsStyles>
  );
}
