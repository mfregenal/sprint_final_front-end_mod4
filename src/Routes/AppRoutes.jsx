import { Route, Routes } from "react-router"
import { Home } from "../pages/Home"
import { AdminPage } from "../pages/AdminPage"
import LoginPage from "../pages/LoginPage"
import ProtectedRoute from "./ProtectedRoutes"
import RegisterPage from "../pages/RegisterPage"

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/login" element={ <LoginPage/> } />
        <Route path="/register" element={ <RegisterPage/> }/>

        <Route element={ <ProtectedRoute requiredRole="Admin"/> }>
          <Route path="/admin" element={ <AdminPage/> } />
        </Route>        
      </Routes>
    </>
  )
}
