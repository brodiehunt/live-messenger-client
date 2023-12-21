import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Signin from '../pages/SignIn';
import Register from '../pages/Register';
import RequestReset from '../pages/RequestReset';
import ResetPassword from '../pages/ResetPassword';
import Conversation from '../pages/Conversation';
import NewConversation from '../pages/NewConversation';
import Account from '../pages/Account';
import Friends from '../pages/Friends';
import SearchFriend from '../pages/SearchFriend';
import AuthCallbackPage from '../pages/AuthCallbackPage';
import MainApp from '../pages/Conversations';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/signin',
          element: <Signin />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/request-reset',
          element: <RequestReset />
        },
        {
          path: '/reset',
          element: <ResetPassword />
        },
        {
          path: '/auth-callback',
          element: <AuthCallbackPage />
        },
        {
          path: '/:userId',
          element: <MainApp />,
          children: [
            {
              path: '/:userId/account',
              element: <Account />
            },
            {
              path: '/:userId/conversation/:conversationId',
              element: <Conversation />
            },
            {
              path: '/:userId/conversation/new',
              element: <NewConversation />
            },
            {
              path: '/:userId/friends',
              element: <Friends />
            },
            {
              path: '/:userId/search-friends',
              element: <SearchFriend />
            }
          ]
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />
}

export default Router;