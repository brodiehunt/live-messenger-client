import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../SearchBar';
import useDebounce from '../../hooks/useDebounce';
import { findUsers } from '../../services/friendServices';
import UserSearchResult from './UserSearchResult';

const UserResultsContainer = styled.div`
  /* padding: 1rem 0; */
  margin: 0 1rem;
  max-height: 400px;
  overflow-y: scroll;
  scrollbar-width: none;
  background-color: white;
  border-radius: 0.5rem;
  &::-webkit-scrollbar {
      display: none;
  }

`;

export default function SearchFriendsInput() {
  // contain the state of the search bar here
  // contain the loading state of the search input here
  const [search, setSearch] = useState('');
  const debouncedVal = useDebounce(search);
  const [isLoading, setIsLoading] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // make api call
    const getUsersFromDb = async () => {
      setIsLoading(true);
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

  function handleBlur(event) {
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