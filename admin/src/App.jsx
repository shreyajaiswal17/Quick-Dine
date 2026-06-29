import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Orders from './pages/Orders/Orders.jsx'
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login/Login.jsx'
 
 

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"

  const [authState, setAuthState] = useState('checking')
  const [accessDenied, setAccessDenied] = useState(false)

  const verifyAdmin = async ({ fromLogin = false } = {}) => {
    setAuthState('checking')

    try {
      const response = await axios.get(`${url}/api/user/verify-admin`, {
        withCredentials: true,
      })

      const isAdmin = Boolean(response.data?.success)
      setAuthState(isAdmin ? 'authenticated' : 'guest')
      setAccessDenied(fromLogin && !isAdmin)

      if (isAdmin) {
        setAccessDenied(false)
      }

      return isAdmin
    } catch (error) {
      setAuthState('guest')
      if (!fromLogin) {
        setAccessDenied(false)
      }
      return false
    }
  }

  useEffect(() => {
    verifyAdmin()
  }, [])

  if (authState === 'checking') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '12px',
        background: '#f7f7f7',
        color: '#262626',
        fontSize: '18px',
        fontWeight: 600,
      }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          border: '4px solid rgba(0, 0, 0, 0.12)',
          borderTopColor: 'tomato',
          animation: 'adminSpin 0.8s linear infinite',
        }} />
        Verifying admin access...
        <style>{`@keyframes adminSpin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (authState !== 'authenticated') {
    return (
      <Login
        onAuthenticated={() => verifyAdmin({ fromLogin: true })}
        accessDenied={accessDenied}
        clearAccessDenied={() => setAccessDenied(false)}
      />
    )
  }

  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Add url={url}/>} />
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/orders" element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
