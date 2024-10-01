import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import './App.css'

function App() {

  return (
    <div className='font-outfit'>
      <Header />
      <Outlet />
    </div>
  
  )
}

export default App
