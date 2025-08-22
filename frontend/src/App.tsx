
import Navbar from "./components/Navbar.tsx"

// @ts-ignore
import HomePage from "./pages/HomePage.tsx"
// @ts-ignore
import LoginPage from "./pages/LoginPage.jsx"
// @ts-ignore
import ProfilePage from "./pages/ProfilePage.jsx"
// @ts-ignore
import SettingsPage from "./pages/SettingsPage.tsx"
// @ts-ignore
import SignupPage from "./pages/SignupPage.jsx"
// @ts-ignore
import {useAuthStore} from "./store/useAuthStore.js"

import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react"
import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast";

const App = () => {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);
  
  console.log({authUser})

  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <div>
      <Navbar/>

      <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />

      </Routes>

      <Toaster />

    </div>
  )
};

export default App