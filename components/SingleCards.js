import * as React from 'react';
import './SingleCard.css';
import '../style.css';

const SingleCard = ({ card, handleChoice, flipped,disabled }) => {
  
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
    
  };

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="card front" />

        <img
          className="back"
          src="https://i.ebayimg.com/images/g/ZkEAAOSwlSxjCmvp/s-l1600.jpg"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
