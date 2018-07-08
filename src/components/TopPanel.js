import React from 'react';
import "./TopPanel.css"

const TopPanel = (props) => {
    let twoPlayer = props.computerMode ? "Копьютер" : "Игрок 2";
    let turnTwoPlayer = props.computerMode ? "Копьютер" : "Ходит игрок 2!";
    let activeOnePlayer = props.turnOnePlayer && !props.win && !props.draw ? "turn-one-player active" : "turn-one-player";
    let activeTwoPlayer = props.turnTwoPlayer && !props.win && !props.draw ? "turn-two-player active" : "turn-two-player";
    return (
        <div className={props.activeTopPanel} >
            <div className={activeOnePlayer}>Ходит игрок 1!</div>
            <div className={activeTwoPlayer}>{turnTwoPlayer}</div>
            <div className="one-player">Игрок 1: <br /><span>{props.scoreOnePlayer}</span></div>
            <div className="two-player">{twoPlayer}: <br /><span>{props.scoreTwoPlayer}</span></div>
            <button className="reset" onClick={props.handelReset}>Очистить все</button>
        </div>
    );
}

export default TopPanel;