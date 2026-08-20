import { Routes, Route } from "react-router-dom"
import LoginPageRoute from "./pages/Login"
import AdminDashboardRoute from "./pages/Admin"
import RegistrationPageRoute from "./pages/Register"
import CustomersListRoute from "./pages/Customers"
import ProtectedRoute from "./components/auth/ProtectedRoute"

export default function App () {
  return (
    <Routes>
      <Route path="/" element={<LoginPageRoute/>}/>
      <Route path="/login" element={<LoginPageRoute/>}/>
      <Route path="/register" element={<RegistrationPageRoute/>}/>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<AdminDashboardRoute/>}/>
        <Route path="/customers" element={<CustomersListRoute/>}/>
      </Route>
    </Routes>
  )
}

