import Plate from '../../assets/home-page/plate.png'

const roundIcons = [Plate, Plate, Plate, Plate, Plate, Plate, Plate, Plate]

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            <span className="text-[#FF5733]">Food</span> is a powerful way to change lives.
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
            We are dedicated to making food donations easier than ever, connecting you with NGOs and those in need. Join us in the mission to reduce food waste and make a difference.
          </p>
          <div className="flex space-x-4">
            <button className="bg-[#FF5733] text-white px-6 py-3 rounded-md font-medium hover:bg-[#E64A19] transition-colors">
              Donate Now
            </button>
            <button className="bg-[#7CB342] text-white px-6 py-3 rounded-md font-medium hover:bg-[#689F38] transition-colors">
              Learn More
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Main dish image */}
            <div className="w-28 h-28 rounded-full items-center justify-center">
              <img
                src={Plate}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Circular food items */}
            <div className="absolute w-[360px] h-[360px] animate-[var(--animation-spin-slow)]">
              <div className="absolute inset-0 border-2 border-dashed border-[#FF5733] rounded-full"></div>
              {roundIcons.map((icon, index) => {
                const angle = (index / roundIcons.length) * 360;
                return (
                  <div
                    key={index}
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(180px) rotate(-${angle}deg)`
                    }}
                  >
                    <div className="w-12 h-12 rounded-full items-center justify-center">
                      <img
                        src={Plate}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

