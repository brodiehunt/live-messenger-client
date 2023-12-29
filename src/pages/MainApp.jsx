import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import useWindowSize from '../hooks/UseWindowSize';
import { getAccount } from '../services/accountServices';
import AppContext from '../hooks/StateContext';
import Conversations from './Conversations';

const MainWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--background-light);
  
  .outlet-container {
    position: relative;
    min-height: 100svh;
  }
  @media (min-width: 768px) {

    display: flex;
    width: 100%;
   
    .outlet-container {
      flex-grow: 1;
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
          <Conversations user={user} />
        : <div className="outlet-container">
            <Outlet />
          </div>
        : <>
            <Conversations user={user} />
            <div className="outlet-container">
              <Outlet />
            </div>
           
          </>
    }
    </MainWrapper>
  )
}
