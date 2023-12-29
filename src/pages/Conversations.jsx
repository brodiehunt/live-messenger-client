import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import useWindowSize from '../hooks/UseWindowSize';
import { getAccount } from '../services/accountServices';
import Profile from '../components/Profile';
import Nav from '../components/Nav';
import AppContext from '../hooks/StateContext';
import SearchBar from '../components/SearchBar';

const MainWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--background-light);
  .convs-container {
    max-width: 768px;
    min-height: 100svh;
    background-color: white;
  }

  .outlet-container {
    position: relative;
    min-height: 100svh;
  }
  @media (min-width: 768px) {

    display: flex;
    /* justify-content: space-between; */
    width: 100%;
    .convs-container {
      flex-grow: 1;
      max-width: 400px;
    }

    .outlet-container {
      flex-grow: 2;
      padding: 1rem;
      padding-top: 0;
      max-height: 100vh;
      overflow-y: scroll;
      scrollbar-width: none;
    }

    .outlet-container::-webkit-scrollbar {
      display: none;
    }
  }
`;


export default function MainApp() {
  const [height, width] = useWindowSize();
  const location = useLocation();
  const navigate = useNavigate();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const isHomePage = pathSegments.length === 1;
  const {store, dispatch} = useContext(AppContext);
  const user = store.user;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getAccount();
        const retrievedUser = response.data.data;
        if (!retrievedUser) {
          navigate('/signin');
        }

        dispatch({
          type: 'setUser',
          data: retrievedUser
        })

      } catch(error) {
        if (error.response) {
          navigate('/signin');
        }
        console.log(error)
      }
      
    }

    if (user) {
      return
    } 
    
    fetchUser();
  }, [])

  if (!user) return <div></div>

  return (
    <MainWrapper className="main-app">
      {
      (width <= 768) ? 
        
        isHomePage ?
        <div className="convs-container">
          <Profile user={user}/>
          <Nav user={user}/>
          <SearchBar 
          handleChange={() => console.log('search convo')}
          name="searchConversations"
          placeholder="Search conversations"
          value=''
          label="Search your conversations"
      />
          <div>conversation list</div>
        </div> 
        : <div className="outlet-container">
            <Outlet />
          </div>
        : <>
            <div className="convs-container">
              <Profile user={user}/>
              <Nav user={user}/>
              <SearchBar />
              <div>conversation list</div>
            </div> 
            <div className="outlet-container">
              <Outlet />
            </div>
           
          </>
    }
    </MainWrapper>
  )
}
