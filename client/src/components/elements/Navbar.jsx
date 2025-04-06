import ZeroBiteLogo from "../shared/ZeroBiteLogo";


export default function Navbar() {

  return <header className="flex items-center max-w-7xl mx-auto justify-between mb-16 py-4 px-4 md:px-8 shadow-[0_6px_3px_-3px_rgba(0,0,0,0.1)]">

    <ZeroBiteLogo />

    <nav className="hidden md:flex items-center space-x-8">
      <a href="/" className="text-[#FF5733] font-lg">
        Home
      </a>
      <a href="/menu" className="text-gray-600 font-lg">
        Menu
      </a>
      <a href="/service" className="text-gray-600 font-lg">
        Service
      </a>
      <a href="/shop" className="text-gray-600 font-lg">
        Shop
      </a>
    </nav>
  </header>
}