import { Outlet } from 'react-router-dom';
import GlobalStyles from './components/styles/Global.js';
import './App.css'

function App() {
  

  return (
    <div>
      <GlobalStyles />
      <Outlet />
    </div>
  )
}

export default App
