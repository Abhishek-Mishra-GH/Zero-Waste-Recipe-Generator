

export default function Navbar() {

  return <header className="flex items-center justify-between mb-16">
    <div className="flex items-center">
      <a href="/" className="flex items-center">
        <span className="text-2xl font-bold text-[#FF5733]">ZERO</span>
        <div className="relative w-8 h-8 mx-0.5">
          <div className="absolute inset-0 border-2 border-[#FF5733] rotate-12"></div>
          <span className="absolute inset-0 flex items-center justify-center text-[#FF5733] font-bold">B</span>
        </div>
        <span className="text-2xl font-bold text-[#FF5733]">ITE</span>
      </a>
    </div>

    <nav className="hidden md:flex items-center space-x-8">
      <a href="/" className="text-[#FF5733] font-medium">
        Home
      </a>
      <a href="/menu" className="text-gray-600 font-medium">
        Menu
      </a>
      <a href="/service" className="text-gray-600 font-medium">
        Service
      </a>
      <a href="/shop" className="text-gray-600 font-medium">
        Shop
      </a>
    </nav>
  </header>
}