import Navbar from "../components/elements/Navbar"
import Hero from "../components/sections/Hero"


export default function Home() {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Navbar />
      <Hero />
    </div>
  )
}