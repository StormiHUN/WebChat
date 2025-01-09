import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import Login from './pages/Login'
import { RouterProvider } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  return (
    <div>

      <Outlet/>

    </div>
  )
}


const router = createBrowserRouter([
  {
    element: <App />, children: [
      {path: "/", element: <Home />}
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> }
])



createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
