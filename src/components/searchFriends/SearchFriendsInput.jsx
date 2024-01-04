import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import useDebounce from '../../hooks/useDebounce';
import { findUsers } from '../../services/friendServices';
import UserResultsContainer from '../styles/searchFriends/UserResultsContainer';
import UserSearchResult from './UserSearchResult';
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
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
  
`

export default function SearchFriendsInput({
  activateToast,
  addNewSentFriendship
}) {
  const [search, setSearch] = useState('');
  const debouncedVal = useDebounce(search);
  const [isLoading, setIsLoading] = useState(null);
  const [users, setUsers] = useState(null);

  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(() => {
    // make api call
    const getUsersFromDb = async () => {
      setIsLoading(true);
      await timeout(3000);
      try {
        const response = await findUsers(debouncedVal);
        const users = response.data.data;
        setUsers(users);
      } catch(error) {
        if (error.response) {
          console.log(error)
        } else if (error.request) {
          console.log(error);
        } else {
          console.log('Throw to error page');
        }
      }
      setIsLoading(false);
    }
    if (debouncedVal !== '') {
      getUsersFromDb();
    } else {
      setUsers(null);
    }
    
    
  }, [debouncedVal])

  function handleBlur() {
    setTimeout(() => {
      setUsers(null);
    }, 200)
  }

  return (
    <div>
      <SearchBar 
        handleChange={setSearch}
        name="searchFriends"
        placeholder="Search for friends"
        value={search}
        label="Search for friends"
        handleBlur={handleBlur}
      />
      {isLoading && 
        <LoadingBar 
          className="progress-loading"
          aria-hidden="true"
        >
        </LoadingBar>
      }
      <UserResultsContainer>
        {users &&
        (
          users.length > 0 ? 
          <div>
            {users.map((user) => {
              return (
                <UserSearchResult 
                  key={user._id} 
                  user={user}
                  activateToast={activateToast}
                  addNewSentFriendship={addNewSentFriendship}
                />
              )
            })}
          </div> :
          <div>No users match</div>
        )  
        }
      </UserResultsContainer>
    </div>
  )
}