import { useEffect } from 'react'
import './assets/main.css'
import Wallpaper from './wallpeper'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Home from './components/home'
import Login from './page/Login'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import axios from 'axios'
import Chat from './page/Chat'
import Data from './page/data'
import PathWidget from './components/navigation'
import ProfileButton from './components/profile'
import Register from './page/Register'
import DataAccount from './components/ShowData'

const currentToken = localStorage.getItem('token') || ''

const PrivateRoute = () => {
  return currentToken ? <Outlet /> : <Navigate to="/login" />
}

const PublicRoute = ({ children }) => {
  return currentToken ? <Navigate to="/" /> : children
}

function App(): JSX.Element {
  const api = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function AuthService() {
      try {
        const result = currentToken ? await axios.get(`${api}/auth`, {
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
      <ProfileButton/>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/Register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path='/chat' element={<Chat/>}/>
          <Route path="/data" element={<Data/>}/>
          <Route path="/dataAcount" element={<DataAccount/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
