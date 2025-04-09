import { Routes, Route } from "react-router"
import Navbar from "./components/elements/Navbar"
import Footer from "./components/elements/Footer"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
