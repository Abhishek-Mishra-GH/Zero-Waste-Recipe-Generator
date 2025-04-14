import { Routes, Route } from "react-router"
import Navbar from "./components/elements/Navbar"
import Footer from "./components/elements/Footer"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/DashBoard"
import SignupPage from "./pages/SignupPage"
import RegisterPage from "./pages/RegisterPage"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
