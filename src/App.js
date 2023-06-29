import React from 'react';
import './style.css';

const DEFAULT_NUMBER_OF_LIFES = 10;
const WORD = 'cheese'; // 6
const NON_TRACKABLE_EVENTS = ['Enter', 'Backspace', 'Space'];

function hasUserRunOutOfLives(numberOfLifes) {
  return numberOfLifes === 0 ? true : false;
}

const App = () => {
  const [lives, setLives] = React.useState(DEFAULT_NUMBER_OF_LIFES);
  const [validGuesses, setGuess] = React.useState([]);

  return (
    <div>
      <h1>Hangman game!</h1>
      <div className="lives">Lives left {lives}</div>
      <div className="hangman__container">
        {WORD.split('').map((letter, index) => {
          if (validGuesses.includes(letter)) {
            return (
              <p key={`letter-${letter}-${index}`} className="hangman__letter">
                {letter}
              </p>
            );
          }
          return <p className="hangman__letter" />;
        })}
      </div>
      <div className="guess__container">
        Guess a letter{' '}
        <input
          type="text"
          maxLength="1"
          disabled={hasUserRunOutOfLives(lives)}
          className="guess__input"
          onKeyUp={(event) => {
            if (!NON_TRACKABLE_EVENTS.includes(event.code)) {
              if (!WORD.includes(event.currentTarget.value)) {
                setLives(lives - 1);
              } else {
                setGuess([...validGuesses, event.currentTarget.value]);
              }
              event.currentTarget.value = '';
            }
          }}
        />
        {hasUserRunOutOfLives(lives) && (
          <p className="guess__input--fail">You Lost</p>
        )}
      </div>
    </div>
  );
};

export default App;
