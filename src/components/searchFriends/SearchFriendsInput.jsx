import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import useDebounce from '../../hooks/useDebounce';
import { findUsers } from '../../services/friendServices';
import UserResultsContainer from '../styles/searchFriends/UserResultsContainer';
import UserSearchResult from './UserSearchResult';


export default function SearchFriendsInput({
  activateToast,
  addNewSentFriendship
}) {
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