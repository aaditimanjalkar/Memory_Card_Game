import React, { useState, useEffect } from 'react';

const Timer = ({ onTimeUp, key }) => {
  const [seconds, setSeconds] = useState(130);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setSeconds(130); // Reset to 130 seconds when the key changes
    setIsActive(true); // Restart the timer when the key changes
  }, [key]);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(interval);
            onTimeUp();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, onTimeUp]);

  return (
    <div className="timer">
      <p>Time Left: {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</p>
    </div>
  );
};

export default Timer;
