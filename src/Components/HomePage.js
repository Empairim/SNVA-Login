import React, { useEffect } from "react";
import confetti from "canvas-confetti";

const HomePage = () => {
  useEffect(() => {
    const confettiSettings = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    };
    confetti(confettiSettings);
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
    </div>
  );
};

export default HomePage;
