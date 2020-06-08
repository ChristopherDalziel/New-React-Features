import React, { useState, useEffect } from "react";

// CUSTOM HOOK

// Starting with use isn't essential it is just a convention
// Custom hooks make functional components super easy to reuse.
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
};

export default useMousePosition;
