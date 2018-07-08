import React from 'react';
import "./GameSelect.css"

const GameSelect = (props) => {
  return (
    <div className="game-select">
      <p>Как будете играть?</p>
      <button className="one-player" value="computer" onClick={props.handelSelect}>Один</button>
      <button className="two-player" onClick={props.handelSelect}>Вдвоем</button>
    </div>
  );
}

export default GameSelect;