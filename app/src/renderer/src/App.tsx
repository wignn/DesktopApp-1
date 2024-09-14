import { useEffect } from 'react'
import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Home from './components/home'
import Login from './page/Login'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import axios from 'axios'
import Wallpaper from './wallpeper'
import Chat from './page/Chat'
import Data from './page/data'
import PathWidget from './components/data'

const currentToken = localStorage.getItem('token') || ''

const PrivateRoute = () => {
  return currentToken ? <Outlet /> : <Login />
}

function App(): JSX.Element {
  useEffect(() => {
    async function AuthService() {
      try {
        const result = currentToken?await axios.get('http://localhost:4001/auth', {
              params: { token: currentToken }
            })
          : { data: '' }
          console.log(result.data)
      } catch (error) {
        localStorage.removeItem('token')
      }
    }
    AuthService()
  }, [currentToken])
  return (
    <Router>
      <Wallpaper/>
      <PathWidget/>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path='/chat' element={<Chat/>}/>
          <Route path="/data" element={<Data/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
