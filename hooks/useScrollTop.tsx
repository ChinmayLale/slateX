"use client";
import { useState, useEffect } from "react";

function useScrollTop({ threshold = 10 }: { threshold?: number }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    // Check on mount in case the user is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrolled;
}

export default useScrollTop;
