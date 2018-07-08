import React from 'react';
import "./GameBoard.css"

const GameBoard = (props) => {
  let won = props.turnOnePlayer && !props.computerMode ? "Выиграл игрок 1" : "Выиграл игрок 2";
  return (
    <div className={props.activeBoard}>
      {props.draw && <div className="draw-message">
        Ничья!
        </div>}
      {(props.win && props.computerMode) && <div> Ой, Вы проиграли</div>}
      {(props.win && !props.computerMode) && <div className="win-message">
        {won}
      </div>}
    </div>
  );
}

export default GameBoard;