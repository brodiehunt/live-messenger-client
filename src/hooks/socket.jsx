import socketio from 'socket.io-client';
import {createContext, useContext, useEffect, useState } from 'react';
import AppContext from './StateContext';

const SocketContext = createContext();


export const SocketProvider = ({children}) => {
  const {store} = useContext(AppContext);
  const user = store.user;
  const [socket, setSocket] = useState(null);

  useEffect(() => {

    if (store.user && store.user._id) {
      const newSocket = socketio.connect(import.meta.env.VITE_SERVER_URL, {
        query: { userId: user._id}
      });

      setSocket(newSocket);

      return () => newSocket.disconnect();
    }

  }, [store.user]);
 

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )

}

export default SocketContext;