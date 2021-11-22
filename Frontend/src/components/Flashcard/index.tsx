import { useWindowSize } from '@react-hook/window-size';
import React, { MutableRefObject } from 'react';
import TinderCard from 'react-tinder-card';
import { Translation } from '../../graphql/translation/types';
import { Direction } from '../Flashcards';

import './Flashcard.css';

interface FlashcardProps {
  translation: Translation;
  childRef: MutableRefObject<any>;
  handleSwipe: (dir: Direction) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({
  translation,
  childRef,
  handleSwipe,
}) => {
  const [showTranslation, setShowTranslation] = React.useState(true);
  const [width, height] = useWindowSize();
  const requirementFulfilled = React.useRef(true);
  const swipeThreshold = (width * height) / 3000;
  
  const flipCard = () => {
    showTranslation === false ? setShowTranslation(true) : setShowTranslation(false);
  };

  const handleFulfilled = (dir: Direction) => {
    if (dir === 'left' || dir === 'right') {
      requirementFulfilled.current = true;
    } else {
      requirementFulfilled.current = false;
    }
  };

  const prepareSwipe = (dir: Direction) => {
    if (requirementFulfilled.current) {
      handleSwipe(dir);
    }
  };

  return (
    <TinderCard
      ref={childRef}
      className="swipe"
      key={translation.id}
      onSwipe={prepareSwipe}
      preventSwipe={['up', 'down']}
      swipeRequirementType="position"
      onSwipeRequirementFulfilled={(dir: Direction) => handleFulfilled(dir)}
      swipeThreshold={swipeThreshold}
    >
      <div className="card" onClick={flipCard}>
        <div className="details">
          {showTranslation ? (
            <h2>{translation.wordTo.name}</h2>
          ) : (
            <h2>{translation.wordFrom.name}</h2>
          )}
        </div>
      </div>
    </TinderCard>
  );
};

export default Flashcard;
