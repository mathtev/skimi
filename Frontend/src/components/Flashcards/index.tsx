import React, { MutableRefObject } from 'react';
import Flashcard from '../Flashcard';
import './Flashcards.css';
import { Translation } from '../../graphql/translation/types';
import { Button, LinearProgress } from '@material-ui/core';
import { FetchResult } from '@apollo/client';
import { TranslationSet } from '../../graphql/translationSet/types';

interface FlashcardsProps {
  translations: TranslationSet[];
  setActive: (state: boolean) => void;
  onReject: (translationSet: TranslationSet, value: number) => void;
  onAccept: (translationSet: TranslationSet, value: number) => void;
}

export type Direction = 'left' | 'right' | 'up' | 'down';

const Flashcards: React.FC<FlashcardsProps> = ({
  translations,
  setActive,
  onReject,
  onAccept,
}) => {
  React.useEffect(() => {
    const handleKeyPressed = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleSlide('left');
      if (e.key === 'ArrowRight') handleSlide('right');
    };
    window.addEventListener('keyup', handleKeyPressed);

    return () => {
      window.removeEventListener('keyup', handleKeyPressed);
    };
  });

  // eslint-disable-next-line
  const [cards, setCards] = React.useState<TranslationSet[]>([...translations]);
  const rejectedCards = React.useRef<TranslationSet[]>([]);
  const acceptedCards = React.useRef<TranslationSet[]>([]);

  // how many cards will be stacked at each other when component is rendered
  const offset = 3;
  const perceentLearned =
    (acceptedCards.current.length / translations.length) * 100;
  const endIndexInit = translations.length;
  const startIndexInit = endIndexInit - offset > 0 ? endIndexInit - offset : 0;

  const [canSwipe, setCanSwipe] = React.useState(true);
  const [startIndex, setStartIndex] = React.useState(startIndexInit);
  const endIndex = React.useRef(endIndexInit);

  // these cards will be rendered
  const cardsRange = cards.slice(startIndex, endIndex.current);

  // array of refs to each card
  const childRefs = React.useRef<React.MutableRefObject<any>[]>([]);

  if (childRefs.current.length !== cards.length) {
    // add or remove refs
    childRefs.current = Array(cards.length)
      .fill(0)
      .map((_, i) => childRefs.current[i] || React.createRef());
  }

  const currentIndexRef = React.useRef(cards.length - 1);

  const handleSlide = async (dir: Direction) => {
    const currentCard = childRefs.current[
      currentIndexRef.current
    ] as MutableRefObject<any>;
    if (
      currentIndexRef.current >= childRefs.current.length ||
      !currentCard?.current?.swipe
    ) {
      return;
    }
    // multiple cards can be swiped at once
    // promise waits for swipe to finish but doesn't block because
    // cards are added to the bottom on every click
    await currentCard.current.swipe(dir);
    // remove card from top
  };

  const handleSwipe = (dir: Direction) => {
    dir === 'left' ? handleReject() : handleAccept();
    currentIndexRef.current -= 1;
    // temp solution
    setTimeout(() => (endIndex.current -= 1), 2000);
    if (currentIndexRef.current < 0) {
      setCanSwipe(false);
      return;
    }
    canSwipe && handleChangeIndex();
  };

  const handleChangeIndex = () => {
    setStartIndex((prevState) => (prevState - 1 > 0 ? prevState - 1 : 0));
  };

  const handleReject = () => {
    const currentCard = cards[currentIndexRef.current];
    rejectedCards.current.unshift(currentCard);
    onReject(currentCard, 10);
  };

  const handleAccept = () => {
    const currentCard = cards[currentIndexRef.current];
    console.log(currentCard);
    acceptedCards.current.unshift(currentCard);
    onAccept(currentCard, 10);
  };

  const handleSetCards = (newCards: TranslationSet[]) => {
    if (endIndex.current !== 0) return;
    const cpy = [...newCards];
    setCards([]);
    // we need to wait for render to finish
    setTimeout(() => setCards(cpy), 0);
    const endIndexInit = newCards.length;
    const startIndexInit =
      endIndexInit - offset > 0 ? endIndexInit - offset : 0;
    setCanSwipe(true);
    endIndex.current = endIndexInit;
    setStartIndex(startIndexInit);
    currentIndexRef.current = newCards.length - 1;
    rejectedCards.current = [];
  };

  // 1 intial render
  // 1 render on every swipe to add card at the bottom
  return (
    <div className="container">
      <button className="closeBtn" onClick={() => setActive(false)}>
        Close &#10006;
      </button>
      <div className="cardDeck">
        {cards.slice(startIndex, endIndex.current).map((translation, idx) => {
          //prettier-ignore
          const childRefIndex = endIndex.current - cardsRange.length + idx;
          return (
            <div key={translation.id}>
              <Flashcard
                childRef={
                  childRefs.current[childRefIndex] as MutableRefObject<any>
                }
                key={translation.id}
                translation={translation.translation}
                handleSwipe={handleSwipe}
              />
            </div>
          );
        })}
        {!canSwipe && perceentLearned !== 100 && (
          <div className="feedback">
            <p>
              You learned {acceptedCards.current.length} / {translations.length}
              <br />
              keep going!
            </p>
            <LinearProgress
              variant="determinate"
              color="secondary"
              value={perceentLearned}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleSetCards(rejectedCards.current)}
            >
              Study hard words
            </Button>
          </div>
        )}
        {perceentLearned === 100 && (
          <div className="feedback">
            <p>
              Congrats!
              <br />
              you learned all words
            </p>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => setActive(false)}
            >
              go back
            </Button>
          </div>
        )}
      </div>
      {canSwipe && (
        <div className="buttons">
          <button onClick={() => handleSlide('left')}>Don't know</button>
          <button onClick={() => handleSlide('right')}>Know</button>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
