import React from "react";

export default function Banner() {
  return (
    <section className="relative w-screen h-[70vh] p-0 m-0">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          poster="/assets/images/hero/hero-three-banner.png"
          loop
          autoPlay
          muted
        >
          <source src="/assets/images/videos/travel1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div> {/* Overlay */}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center h-full px-0">
        <div className="text-white w-full lg:w-3/5 space-y-6 pl-8 lg:pl-16">
          <h4 className="text-5xl w-[76%] mx-auto font-bold mb-4 animate__animated animate__fadeInUp">
            Plan tours to dream <br /> locations in just a click!
          </h4>
          <p className="text-lg  w-[76%] mx-auto animate__animated animate__fadeInUp animate__delay-1s">
            Travel is a transformative and enriching experience that allows
            individuals to explore new destinations, cultures, and landscapes.
          </p>
        </div>
      </div>
    </section>
  );
}
