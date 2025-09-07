import React from "react";
import Image from "next/image";
function Hero() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center justify-between w-full gap-x-10">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] overflow-hidden">
          <Image
            src={"/ThinkingD.svg"}
            fill
            alt="thinking"
            className="object-contain"
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <Image
            src={"/LearningD.svg"}
            fill
            alt="thinking"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
