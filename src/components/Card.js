import React from 'react';
import '../styles/Card.css'; 

const Card = ({ card, onClick, isFlipped }) => {
  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''}`} 
      onClick={() => !card.matched && onClick(card)} // Prevent clicks on matched cards
    >
      <img 
        src={isFlipped ? card.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrdirLB1DOBbn2TrLC00aQxupfSgbolQLGfA&s'} 
        alt="card" 
      />
    </div>
  );
};

export default Card;
