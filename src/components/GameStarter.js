import React from 'react';
import "./GameStarter.css"

const GameStarter = (props) => {
    let question = props.computerMode ? "Крестик или нолик?" : "Игрок 1: крестик или нолик?";
    return (
        <div className="game-starter" >
            <p>{question}</p>
            <button className="choose-x" value="x" onClick={props.handelChoice}>X</button>
            <button className="choose-o" value="o" onClick={props.handelChoice}>O</button><br />
            <button className="back-button" onClick={props.handelBack}>Назад</button>
        </div>
    );
}

export default GameStarter;