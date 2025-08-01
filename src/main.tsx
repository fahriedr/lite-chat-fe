import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.tsx'
import Login from './pages/Login.tsx'
import { Toaster } from "react-hot-toast";
import Home from './pages/Home.tsx'
import Register from './pages/Register.tsx'
import OauthCallback from './pages/OauthCallback.tsx'

const router = createBrowserRouter([
  { path: "/", element: <App/> },
  { path: "login", element: <Login/>},
  { path: "register", element: <Register/>},
  { path: "home", element: <Home/>},
  { path: "oauth/callback", element: <OauthCallback/>},
  { path: "*", element: <NotFoundPage/>}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster/>
    <RouterProvider router={router} />
  </StrictMode>,
)
