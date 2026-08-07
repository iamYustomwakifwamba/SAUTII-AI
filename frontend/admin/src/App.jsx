import { Routes, Route } from "react-router-dom"
import LoginPageRoute from "./pages/Login"
import AdminDashboardRoute from "./pages/Admin"

export default function App () {
  return (
    <Routes>
      <Route path="/" element={<LoginPageRoute/>}/>
      <Route path="/login" element={<LoginPageRoute/>}/>
      <Route path="/dashboard" element={<AdminDashboardRoute/>}/>
    </Routes>
  )
}

