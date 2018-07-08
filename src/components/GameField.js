import React from 'react';
import "./GameField.css"

const GameField = (props) => {
    // Highlight a winning combination
    let styles = [];

    for (let i = 0; i < 9; i++) {
        styles.push({ background: "transparent" })
    }

    for (let i = 0; i < styles.length; i++) {
        if (props.winCombo.indexOf(i + 1) !== -1) {
            styles[i] = { background: "rgba(0, 0, 0, 0.8)" }
        }
    }

    return (
        <div className="game-field">
            <table>
                <tbody>
                    <tr>
                        <td id="1" style={styles[0]} onClick={props.play}>{props.currentBoard["1"]}</td>
                        <td id="2" style={styles[1]} onClick={props.play}>{props.currentBoard["2"]}</td>
                        <td id="3" style={styles[2]} onClick={props.play}>{props.currentBoard["3"]}</td>
                    </tr>
                    <tr>
                        <td id="4" style={styles[3]} onClick={props.play}>{props.currentBoard["4"]}</td>
                        <td id="5" style={styles[4]} onClick={props.play}>{props.currentBoard["5"]}</td>
                        <td id="6" style={styles[5]} onClick={props.play}>{props.currentBoard["6"]}</td>
                    </tr>
                    <tr>
                        <td id="7" style={styles[6]} onClick={props.play}>{props.currentBoard["7"]}</td>
                        <td id="8" style={styles[7]} onClick={props.play}>{props.currentBoard["8"]}</td>
                        <td id="9" style={styles[8]} onClick={props.play}>{props.currentBoard["9"]}</td>
                    </tr>
                </tbody>
            </table>
            {props.block && <div className="block"></div>}
        </div>
    );
}

export default GameField;