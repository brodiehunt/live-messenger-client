import {createContext, useReducer} from 'react';
import stateReducer from './stateReducer';

const AppContext = createContext();

export const StateProvider = ({children}) => {
  const initialState = {
    user: null
  };

  const [store, dispatch] = useReducer(stateReducer, initialState);

  return (
    <AppContext.Provider value={{store, dispatch}}>
      {children}
    </AppContext.Provider>
  )

}

export default AppContext;