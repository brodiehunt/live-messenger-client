import { Outlet } from 'react-router-dom';
import { StateProvider } from './hooks/StateContext.jsx';
import GlobalStyles from './components/styles/Global.js';


function App() {
  
  return (
    <div>
      <GlobalStyles />
      <StateProvider>
        <Outlet />
      </StateProvider>
    </div>
  )
}

export default App
