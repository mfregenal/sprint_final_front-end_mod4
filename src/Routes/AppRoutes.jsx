import { Route, Routes } from "react-router"
import { Home } from "../components/Home"
import { AdminPage } from "../components/adminComponents/AdminPage"

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/admin" element={ <AdminPage/> } />
      </Routes>
    </>
  )
}
