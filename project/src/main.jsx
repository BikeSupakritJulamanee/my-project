import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// add bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// add context
import { UserAuthContextProvider } from './context/UserAuthContext.jsx'

// add ProtectedRoute for protect home page
import ProtectedRoute from './auth/ProtectedRoute.jsx';

// add react-router-dom
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

// add router
import Register from './component/Register.jsx'
import Login from './component/Login.jsx'
import Home from './component/Home.jsx'
import Searching from './component/Searching.jsx'
import Message from './component/Message.jsx'
import Notifications from './component/Notifications.jsx'
import Create_Post from './component/Create_Post.jsx'
import Profile from './component/Profile.jsx'


// add back end router
import BackEnd from './back-end/BackEnd.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/home',
    element: <ProtectedRoute><Home /></ProtectedRoute>
  },
  {
    path: '/searching',
    element: <Searching />
  },
  {
    path: '/message',
    element: <Message />
  },
  {
    path: '/notifications',
    element: <Notifications />
  },
  {
    path: '/create_post',
    element: <Create_Post />
  },
  {
    path: '/profile',
    element: <Profile />
  },

  {
    path: '/back',
    element: <ProtectedRoute><BackEnd /></ProtectedRoute>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
  </React.StrictMode>,
)
