import { AppRoutes } from "./Routes/AppRoutes"
import { ToastContainer } from "react-toastify"

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
        style={{ zIndex: 2 }}
      />
      <AppRoutes/>
    </>
  )
}

export default App