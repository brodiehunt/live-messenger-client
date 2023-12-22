import { Outlet, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import useWindowSize from '../hooks/UseWindowSize';

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
  }

  .outlet-container {
    position: relative;
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
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const isHomePage = pathSegments.length === 1;
  const {store, dispatch} = useContext(AppContext);
  const user = store.user;

  return (
    <MainWrapper className="main-app">
      {
      (width <= 768) ? 
        
        isHomePage ?
        <div className="convs-container">
          <Profile user={user}/>
          <Nav user={user}/>
          <SearchBar />
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
