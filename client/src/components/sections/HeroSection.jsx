import { useState, useEffect } from 'react'
import Plate from '../../assets/home-page/plate.png'
import PlateA from '../../assets/home-page/PlateA.png'

const roundIcons = [Plate, Plate, Plate, Plate, Plate, Plate, Plate, Plate]

export default function HeroSection() {
  const [distance, setDistance] = useState(135);
  const [currentPlate, setCurrentPlate] = useState(Plate);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlate(prev => (prev === Plate ? PlateA : Plate));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDistance(window.innerWidth >= 768 ? 200 : 135); // Tailwind's md = 768px
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 sm:gap-2 mb-20">
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
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
          <div className="relative w-full h-[500px] max-w-screen overflow-hidden  flex items-center justify-center">
            {/* Main dish image */}
            <div className="w-28 h-28 rounded-full items-center justify-center">
              <img
                src={currentPlate}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Circular food items */}
            <div className="absolute max-w-screen w-[270px] h-[270px] md:w-[400px] md:h-[400px] animate-[spin_10s_linear_infinite]">
              <div className="absolute inset-0 border-2 border-dashed border-[#FF5733] rounded-full"></div>
              {roundIcons.map((icon, index) => {
                const angle = (index / roundIcons.length) * 360;
                return (
                  <div
                    key={index}
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(${distance}px) rotate(-${angle}deg)`
                    }}
                  >
                    <div className="w-18 h-18 rounded-full items-center justify-center">
                      <img
                        src={icon}
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