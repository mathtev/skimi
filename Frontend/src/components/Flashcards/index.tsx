import React, { MutableRefObject } from 'react';
import MovieCard from '../Flashcard';
import './MovieDeck.css';
import { useAppState } from '../../hooks/useAppState';
import { Translation } from '../../graphql/translation/types';

interface FlashcardsProps {
  translations: Translation[];
}

export type Direction = 'left' | 'right' | 'up' | 'down';

const Flashcards: React.FC<FlashcardsProps> = ({ translations }) => {
  const [, dispatchAppState] = useAppState();
  // eslint-disable-next-line
  const [cards, setCards] = React.useState([...translations]);

  // how many cards will be stacked at each other when component is rendered
  const offset = 3;
  const endIndexInit = translations.length;
  const startIndexInit = endIndexInit - offset > 0 ? endIndexInit - offset : 0;

  const [canSwipe, setCanSwipe] = React.useState(true);
  const [startIndex, setStartIndex] = React.useState(startIndexInit);
  const endIndex = React.useRef(endIndexInit);

  // these cards will be rendered
  const cardsRange = cards.slice(startIndex, endIndex.current);

  // array of refs to each card
  const childRefs = React.useRef([]);

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
      !currentCard.current?.swipe
    ) {
      return;
    }
    // add card to the bottom
    handleChangeIndex();
    // multiple cards can be swiped at once
    // promise waits for swipe to finish but doesn't block because
    // cards are added to the bottom on every click
    await currentCard.current.swipe(dir);
    // remove card from top
    endIndex.current -= 1;
  };

  const handleSwipe = (dir: Direction) => {
    dir === 'left' ? handleReject() : handleAccept();
    currentIndexRef.current -= 1;
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
    console.log('not know');
  };

  const handleAccept = () => {
    console.log('know')
  };

  console.log('rendr');

  // 1 intial render
  // 1 render on every swipe to add card at the bottom
  return (
    <div className="container">
      <div className="movieDeck">
        {cards
          .slice(startIndex, endIndex.current)
          .map((translation, idx) => {
            //prettier-ignore
            const childRefIndex = endIndex.current - cardsRange.length + idx;
            return (
              <MovieCard
                childRef={
                  childRefs.current[childRefIndex] as MutableRefObject<any>
                }
                key={translation.id}
                translation={translation}
                handleSwipe={handleSwipe}
              />
            );
          })}
      </div>
      {canSwipe && (
        <div className="buttons">
          <button onClick={() => handleSlide('left')}>
            Don't know
          </button>
          <button onClick={() => handleSlide('right')}>
            Know
          </button>
        </div>
      )}
      {!canSwipe && <h2 className="cannotSwipe">No more translations</h2>}
    </div>
  );
};

export default Flashcards;
