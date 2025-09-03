import { ToastContainer } from "react-toastify"
import { AppRoutes } from "./Routes/AppRoutes"

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        style={{ zIndex: 12 }}
      />
      <AppRoutes/>
    </>
  )
}

export default App