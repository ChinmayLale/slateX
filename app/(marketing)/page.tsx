import React from "react";
import Header from "./_Components/Header";
import Hero from "./_Components/Hero";
import Footer from "./_Components/Footer";

function LandingPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Header />
        <Hero />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
