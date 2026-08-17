import { Routes, Route } from "react-router-dom"
import LoginPageRoute from "./pages/Login"
import AdminDashboardRoute from "./pages/Admin"
import RegistrationPageRoute from "./pages/Register"
import CustomersListRoute from "./pages/Customers"

export default function App () {
  return (
    <Routes>
      <Route path="/" element={<LoginPageRoute/>}/>
      <Route path="/login" element={<LoginPageRoute/>}/>
      <Route path="/register" element={<RegistrationPageRoute/>}/>
      <Route path="/dashboard" element={<AdminDashboardRoute/>}/>
      <Route path="/customers" element={<CustomersListRoute/>}/>
    </Routes>
  )
}

