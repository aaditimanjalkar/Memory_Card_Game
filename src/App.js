import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Timer from './components/Timer';
import './styles/App.css';
import matchSound from './sounds/match.mp3';
import mismatchSound from './sounds/mismatch.mp3';
import overSound from './sounds/gameover.mp3';
import winSound from './sounds/win.mp3';

const images = [ 
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuC8Ixlkc8FLhO6ZFCmRgnT5CPGffzGFn7gA&s',
  'https://i.pinimg.com/736x/cc/1b/20/cc1b20c4eaa7a48bd1b416eee8c01e57.jpg',
  'https://i.pinimg.com/originals/81/aa/6b/81aa6b36930a0af2d0a6ef967adfe5af.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQiOpiH2r8coAwBdNNRTLqIxsqehDkNIEgTTfqPodrtvTykp-E_Pv0T-LgMQo-5LBFaXg&usqp=CAU',
  'https://www.freeiconspng.com/thumbs/emoticons-whatsapp/download-emoticons-whatsapp-icon-26.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuGzACQVYvgx7Oal0X2qUnnVgGCamquqQRw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJjBXsQluTG16zt0OkhVIk9lxMEMZg8pF6AQ&s',
  'https://i.pinimg.com/736x/7b/27/1e/7b271eb0ea4c53a04e1e4edcf74fb510.jpg'
];

const generateCards = () => {
  const cardImages = [...images, ...images];
  return cardImages
    .sort(() => Math.random() - 0.5)
    .map((image, index) => ({ id: index, image, matched: false }));
};

const App = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matches, setMatches] = useState(0);
  const [remainingFlips, setRemainingFlips] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [showingImages, setShowingImages] = useState(true);
  const [timerKey, setTimerKey] = useState(Date.now()); // Key for Timer component


  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleCardClick = (card) => {
    if (flippedIndices.length === 2 || gameOver || showingImages || card.matched) return;

    const newFlippedIndices = [...flippedIndices, card.id];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex].image === cards[secondIndex].image) {
        playSound(matchSound); // Play match sound here
        const updatedCards = cards.map((c, index) => {
          if (index === firstIndex || index === secondIndex) {
            return { ...c, matched: true };
          }
          return c;
        });
        setCards(updatedCards);
        setMatches(matches + 1);
      } else {
        playSound(mismatchSound); // Play mismatch sound here
        setRemainingFlips(remainingFlips - 1);
        if (remainingFlips <= 1) setGameOver(true);
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  };

  const handleTimeUp = () => setGameOver(true);

  const handlePlayAgain = () => {
    setCards(generateCards());
    setFlippedIndices([]);
    setMatches(0);
    setRemainingFlips(5);
    setGameOver(false);
    setShowingImages(true);
    setTimerKey(Date.now()); // Reset timer
    setTimeout(() => {
      setShowingImages(false);
    }, 10000);
  };

  useEffect(() => {
    if (matches === 8) setGameOver(true);
  }, [matches]);

  useEffect(() => {
    if (!showingImages) return;
    const timer = setTimeout(() => {
      setShowingImages(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [showingImages]);

  // Play sound effects based on game status
  useEffect(() => {
    if (gameOver) {
      if (matches === 8) {
        playSound(winSound); // Play "You Win" sound
      } else {
        playSound(overSound);// Play "Game Over" sound
      }
    }
  }, [gameOver, matches]);

  return (
    <div className="app">
      <div className="timer">
        <Timer key={timerKey} onTimeUp={handleTimeUp} />
      </div>
      <div className="scoreboard-container">
        <div className="scoreboard">Matches Found: {matches}</div>
        <div className="scoreboard">Flips Left: {remainingFlips}</div>
      </div>
      <div className="grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
            isFlipped={flippedIndices.includes(card.id) || showingImages || card.matched}
          />
        ))}
      </div>
      {gameOver && (
        <div className="game-over">
          <p>{matches === 8 ? 'You Win!'  : 'Game Over!'}</p>
          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}
      <div className="footer-text">Developed by Aryan Agrawal, Aaditi Manjlakar</div>
    </div>
  );
};

export default App;
