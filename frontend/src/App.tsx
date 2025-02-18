import { Navigate, Route, Routes } from "react-router-dom"

import HomePage from "./pages/Home"
import SignupPage from "./pages/Signup"
import LoginPage from "./pages/Login"
import SettingsPage from "./pages/Settings"
import ProfilePage from "./pages/Profile"

import { Loader } from 'lucide-react'

import NavbarComponent from "./components/Navbar"
import { useAuthStrore } from "./store/useAuthStore"
import { useEffect } from "react"

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStrore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  console.log({ authUser })
/*
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }
*/
  return (
    <div className="p-2">
      Página inicial

      <Routes >
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path="/setings" element={<SettingsPage />} />
        <Route path="/profile" element={ authUser ?<ProfilePage /> : <Navigate to='/login' />} />
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  )
}

export default App
