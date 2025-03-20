import React from 'react';
import { Link } from 'react-router-dom';

const GameList = ({ games }) => {
  return (
    <div className="game-list">
      {games.map(game => (
        <Link to={`/game/${game.id}`} key={game.id}>
          <div className="game-card">
            <h3>{game.name}</h3>
            <p>Дата выхода: {game.release_date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GameList;
