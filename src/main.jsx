import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import { RouterProvider } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import { AuthProvider, useAuth } from './components/AuthProvider'
import { useEffect } from 'react'
import Settings from './pages/Settings'

function App() {
  const auth = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if(auth.auth === null) navigate("/login")
  },[auth])

  if(auth.user) return <Outlet/> 
  else return <p className='fixed top-0 left-0 w-full h-screen bg-white flex justify-center items-center'>Loading...</p>
}




const router = createBrowserRouter([
  {
    element: <App />, children: [
      {path: "/", element: <Home />},
      { path: "/settings", element: <Settings /> }
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> }
])



createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
