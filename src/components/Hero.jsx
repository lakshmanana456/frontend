import React, { useEffect, useRef, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideIntervalRef = useRef(null);

  const sliderImages = [
    { image: "/slider-1.jpg" },
    { image: "/slider-2.jpg", content: "Shop New Mens Collection For Festival Function", btn: "Shop Now" },
    { image: "/slider-3.png", content: "", btn: "Shop Now" },
  ];

  function prevSlide() {
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  }

  function nextSlide() {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  }

  // Start autoplay
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [currentIndex]);

  // Helper functions
  function startAutoPlay() {
    stopAutoPlay(); // clear previous interval
    slideIntervalRef.current = setInterval(nextSlide, 2000);
  }

  function stopAutoPlay() {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  }

  return (
    <div
      className="relative overflow-hidden bg-gray-200"
      onMouseEnter={stopAutoPlay}   // Pause on hover
      onMouseLeave={startAutoPlay} // Resume on leave
    >
      {/* Left Arrow */}
      <span
        onClick={prevSlide}
        className="absolute z-10 text-white left-2 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer text-5xl hover:text-6xl transition-all"
      >
        <FaAngleLeft />
      </span>

      {/* Slides Container */}
      <div
        className="flex transition-all duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sliderImages.map((data, index) => (
          <div key={index} className="relative min-w-full h-[25vw] flex items-center justify-center">
            <img
              src={data.image}
              alt={`slide ${index}`}
              className="w-full h-full  cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <span
        onClick={nextSlide}
        className="absolute z-10 text-white rounded-full right-2 top-1/2 text-5xl -translate-y-1/2 p-2 cursor-pointer hover:text-6xl transition-all"
      >
        <FaAngleRight />
      </span>
    </div>
  );
};

export default Hero;
