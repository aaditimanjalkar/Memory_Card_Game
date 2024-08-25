import React from 'react';

const Scoreboard = ({ matches, remainingFlips }) => {
  return (
    <div className="scoreboard">
      <p>Matches: {matches}</p>
      <p>Remaining Flips: {remainingFlips}</p>
    </div>
  );
};

export default Scoreboard;
