import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
 
import { BACKEND_URL } from '../../constants';

const GAMES_ENDPOINT = `${BACKEND_URL}/games`;

function AddGameForm({
  visible,
  cancel,
  fetchGames,
  setError,
}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeNumber = (event) => { setNumber(event.target.value); };

  const addGame = (event) => {
    event.preventDefault();
    axios.post(GAMES_ENDPOINT, { name, numPlayers: number })
      .then(fetchGames)
      .catch(() => { setError('There was a problem adding the game.'); });
  };

  if (!visible) return null;
  return (
    <form>
      <label htmlFor="name">
        Name
      </label>
      <input required type="text" id="name" value={name} onChange={changeName} />
      <label htmlFor="number-of-players">
        Number of players
      </label>
      <input required type="number" id="number-of-players" onChange={changeNumber} />
      <button type="button" onClick={cancel}>Cancel</button>
      <button type="submit" onClick={addGame}>Submit</button>
    </form>
  );
}
AddGameForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchGames: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      {message}
    </div>
  );
}
ErrorMessage.propTypes = {
  message: propTypes.string.isRequired,
};

function Game({ game }) {
  const { name, numPlayers } = game;
  return (
    <Link to={name}>
      <div className="game-container">
        <h2>{name}</h2>
        <p>
          Players: {numPlayers}
        </p>
      </div>
    </Link>
  );
}
Game.propTypes = {
  game: propTypes.shape({
    name: propTypes.string.isRequired,
    numPlayers: propTypes.number.isRequired,
  }).isRequired,
};

function gamesObjectToArray({ Data }) {
  const keys = Object.keys(Data);
  const games = keys.map((key) => Data[key]);
  return games;
}

function Games() {
  const [error, setError] = useState('');
  const [games, setGames] = useState([]);
  const [addingGame, setAddingGame] = useState(false);

  const fetchGames = () => {
    axios.get(GAMES_ENDPOINT)
      .then(({ data }) => setGames(gamesObjectToArray(data)))
      .catch(() => setError('There was a problem retrieving the list of games.'));
  };

  const showAddGameForm = () => { setAddingGame(true); };
  const hideAddGameForm = () => { setAddingGame(false); };

  useEffect(fetchGames, []);

  return (
    <div className="wrapper">
      <header>
        <h1>
          View All Games
        </h1>
        <button type="button" onClick={showAddGameForm}>
          Add a Game
        </button>
      </header>
      <AddGameForm
        visible={addingGame}
        cancel={hideAddGameForm}
        fetchGames={fetchGames}
        setError={setError}
      />
      {error && <ErrorMessage message={error} />}
      {games.map((game) => <Game key={game.name} game={game} />)}
    </div>
  );
}

export default Games;
