import { Routes, Route } from "react-router"
import Navbar from "./components/elements/Navbar"
import Footer from "./components/elements/Footer"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import RegisterPage from "./pages/RegisterPage"
import NGODashboard from "./pages/NgoDashboard"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ngodashboard" element={<NGODashboard />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
