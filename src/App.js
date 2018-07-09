import React, { Component } from 'react';
import './App.css';
import TopPanel from './components/TopPanel';
import GameSelect from "./components/GameSelect";
import GameStarter from "./components/GameStarter";
import GameField from "./components/GameField";
import GameBorder from "./components/GameBoard";

const defaultState = {
  activeStarter: false,
  activeSelect: true,
  activeField: false,
  activeTopPanel: false,
  activeBoard: false,
  playerOneSymbol: '',
  playerTwoSymbol: "",
  turnOnePlayer: false,
  turnTwoPlayer: false,
  currentBoard: {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: ''
  },
  winCombos: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [7, 5, 3]
  ],
  count: 0,
  draw: false,
  win: false,
  scoreOnePlayer: 0,
  scoreTwoPlayer: 0,
  playerSymbol: "",
  winCombo: [],
  computerMode: false,
  block: false,
  computerTurnSecond: false,
  computerTurnFirst: false
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;

    this.handelSelect = this.handelSelect.bind(this);
    this.handelBack = this.handelBack.bind(this);
    this.handelChoice = this.handelChoice.bind(this);
    this.handelReset = this.handelReset.bind(this);
    this.play = this.play.bind(this);
  }
  componentDidUpdate() {
    //Start New Game
    if (this.state.activeBoard) {
      setTimeout(() => {
        this.setState({
          win: false,
          activeBoard: false,
          currentBoard: {
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            7: '',
            8: '',
            9: ''
          },
          count: 0,
          draw: false,
          winCombo: [],
          block: false,
          computerTurnSecond: false,
          computerTurnFirst: false
        })
      }, 2000)
    }

    //is Draw
    if (this.state.count === 9 && !this.state.win) {
      let turn = Math.random() > 0.5 ? true : false;
      this.setState({
        draw: true,
        activeBoard: true,
        count: 0,
        turnOnePlayer: turn,
        turnTwoPlayer: !turn
      })
    }

    // is Winner
    if (this.state.playerSymbol) {
      for (let i = 0; i < this.state.winCombos.length; i++) {
        let win = this.state.winCombos[i].every(item => {
          return this.state.currentBoard[item] === this.state.playerSymbol;
        })
        if (win) {
          this.setState({
            playerSymbol: "",
            win: true,
            draw: false,
            activeBoard: true,
            winCombo: this.state.winCombos[i],
            turnTwoPlayer: this.state.turnOnePlayer ? true : false,
            turnOnePlayer: this.state.turnTwoPlayer ? true : false,
            scoreTwoPlayer: this.state.turnOnePlayer ? this.state.scoreTwoPlayer + 1 : this.state.scoreTwoPlayer,
            scoreOnePlayer: this.state.turnOnePlayer ? this.state.scoreOnePlayer : this.state.scoreOnePlayer + 1

          })
          break;
        }
      }
    }

    /*================================
    Computer Move Decisions
    =================================*/    
    // Computer Goes Second
    if (this.state.computerMode && this.state.turnTwoPlayer && this.state.computerTurnSecond) {
      if (this.state.currentBoard["5"] === this.state.playerOneSymbol && this.state.count === 1) {
        let angulars = [1, 3, 7, 9];
        let angularRandom = angulars[Math.floor(Math.random() * angulars.length)];
        let obj = {};
        obj[angularRandom] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;

        setTimeout(() => {
          this.setState({
            currentBoard: Object.assign({}, this.state.currentBoard, obj),
            playerSymbol: (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol,
            count: this.state.count + 1,
            block: false,
            turnTwoPlayer: this.state.turnOnePlayer ? true : false,
            turnOnePlayer: this.state.turnTwoPlayer ? true : false
          })
        }, 1000);

      }

      if (this.state.currentBoard["5"] === "" && this.state.count === 1) {
        let obj = {};
        obj["5"] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;

        setTimeout(() => {
          this.setState({
            currentBoard: Object.assign({}, this.state.currentBoard, obj),
            playerSymbol: (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol,
            count: this.state.count + 1,
            block: false,
            turnTwoPlayer: this.state.turnOnePlayer ? true : false,
            turnOnePlayer: this.state.turnTwoPlayer ? true : false
          })
        }, 1000);

      }


      if (this.state.count === 3 || this.state.count === 5 || this.state.count === 7) {
        let obj = {};
        let win = false;
        for (let i = 0; i < this.state.winCombos.length; i++) {

          let count = 0;
          this.state.winCombos[i].forEach(item => {
            if (this.state.currentBoard[item] === this.state.playerTwoSymbol) {
              count += 1
            };
          })

          if (count === 2) {
            this.state.winCombos[i].forEach(item => {
              if (this.state.currentBoard[item] === "") {
                obj[item] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
                win = true;
              }
            })
            if(win) break;
          }
        }

        if (!win) {

          for (let i = 0; i < this.state.winCombos.length; i++) {

            let count = 0;
            this.state.winCombos[i].forEach(item => {
              if (this.state.currentBoard[item] === this.state.playerSymbol) {
                count += 1
              };
            })

            if (count === 2) {
              this.state.winCombos[i].forEach(item => {
                if (this.state.currentBoard[item] === "") {
                  obj[item] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
                } else if (this.state.count === 3 && this.state.currentBoard[item] === this.state.playerTwoSymbol) {
                  if (item === 7) {
                    obj["1"] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
                  }
                  if (item === 1) {
                    obj["3"] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
                  }
                  if (item === 3) {

                    obj["9"] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
                  }
                  if (item === 9) {
                    obj["7"] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
                  }
                }
              })
            }
          }
        }

        if (Object.keys(obj).length === 0) {
          for (let i = 0; i < this.state.winCombos.length; i++) {
            let count = 0;
            let empty = 0;
            this.state.winCombos[i].forEach(item => {
              if (this.state.currentBoard[item] === this.state.playerTwoSymbol) count += 1;
              if (this.state.currentBoard[item] === "") empty += 1;
            })
            if (count === 1 && empty === 2) {
              for (let j = 0; j < this.state.winCombos[i].length; j++) {
                let item = this.state.winCombos[i][0];
                if (this.state.currentBoard["8"] !== "") item = this.state.winCombos[i][2];

                obj[item] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
                break;
              }
              break;
            }
          }
        }

        if (Object.keys(obj).length === 0) {
          for (let key in this.state.currentBoard) {
            if (this.state.currentBoard[key] === "") {
              obj[key] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
              break;
            }
          }
        }


        setTimeout(() => {
          this.setState({
            currentBoard: Object.assign({}, this.state.currentBoard, obj),
            playerSymbol: (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol,
            count: this.state.count + 1,
            block: false,
            turnTwoPlayer: this.state.turnOnePlayer ? true : false,
            turnOnePlayer: this.state.turnTwoPlayer ? true : false
          })
        }, 1000);
      }

    }

    // Computer Goes First

    if (this.state.computerMode && this.state.turnTwoPlayer && !this.state.computerTurnSecond) {
      if (this.state.count === 0) {
        let angulars = [1, 3, 7, 9];
        let angularRandom = angulars[Math.floor(Math.random() * angulars.length)];
        let obj = {};
        obj[angularRandom] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;

        setTimeout(() => {
          this.setState({
            currentBoard: Object.assign({}, this.state.currentBoard, obj),
            playerSymbol: (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol,
            count: this.state.count + 1,
            block: false,
            turnTwoPlayer: this.state.turnOnePlayer ? true : false,
            turnOnePlayer: this.state.turnTwoPlayer ? true : false,
            computerTurnFirst: true
          })
        }, 1000);
      }

      if (this.state.count === 2) {
        let obj = {};
        if (this.state.currentBoard["5"] === this.state.playerOneSymbol) {
          if (this.state.currentBoard["9"] === this.state.playerTwoSymbol) {
            obj["1"] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
          }
          if (this.state.currentBoard["7"] === this.state.playerTwoSymbol) {
            obj["3"] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
          }
          if (this.state.currentBoard["1"] === this.state.playerTwoSymbol) {

            obj["9"] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
          }
          if (this.state.currentBoard["3"] === this.state.playerTwoSymbol) {
            obj["7"] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
          }
        } else {
          for (let i = 0; i < this.state.winCombos.length; i++) {
            let count = 0;
            let empty = 0;
            this.state.winCombos[i].forEach(item => {
              if (this.state.currentBoard[item] === this.state.playerTwoSymbol) count += 1;
              if (this.state.currentBoard[item] === "") empty += 1;
            })
            if (count === 1 && empty === 2) {
              if (this.state.winCombos[i][0] !== "") obj[this.state.winCombos[i][2]] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
              if (this.state.winCombos[i][2] !== "") obj[this.state.winCombos[i][0]] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;

              break;
            }
          }
        }
        setTimeout(() => {
          this.setState({
            currentBoard: Object.assign({}, this.state.currentBoard, obj),
            playerSymbol: (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol,
            count: this.state.count + 1,
            block: false,
            turnTwoPlayer: this.state.turnOnePlayer ? true : false,
            turnOnePlayer: this.state.turnTwoPlayer ? true : false,
          })
        }, 1000);
      }

      if (this.state.count === 4 || this.state.count === 6 || this.state.count === 8) {
        let obj = {};
        let win;

        for (let i = 0; i < this.state.winCombos.length; i++) {

          let count = 0;
          this.state.winCombos[i].forEach(item => {
            if (this.state.currentBoard[item] === this.state.playerTwoSymbol) {
              count += 1
            };
          })

          if (count === 2) {
            this.state.winCombos[i].forEach(item => {
              if (this.state.currentBoard[item] === "") {
                obj[item] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
                win = true;
              }
            })
            if(win) break;
          }
        }

        if (!win) {

          for (let i = 0; i < this.state.winCombos.length; i++) {

            let count = 0;
            this.state.winCombos[i].forEach(item => {
              if (this.state.currentBoard[item] === this.state.playerSymbol) {
                count += 1
              };
            })

            if (count === 2) {
              this.state.winCombos[i].forEach(item => {
                if (this.state.currentBoard[item] === "") {
                  obj[item] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
                }
              })
            }
          }
        }

        if (Object.keys(obj).length === 0) {
          for (let i = 0; i < this.state.winCombos.length; i++) {

            let count = 0;
            this.state.winCombos[i].forEach(item => {
              if (this.state.currentBoard[item] === this.state.playerSymbol) {
                count += 1
              };
            })

            if (count === 2) {
              this.state.winCombos[i].forEach(item => {
                if (this.state.currentBoard[item] === "") {
                  obj[item] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
                }
              })
            }
          }
        }

        if (Object.keys(obj).length === 0) {

          for (let i = 0; i < this.state.winCombos.length; i++) {
            let count = 0;
            let empty = 0;
            this.state.winCombos[i].forEach(item => {
              if (this.state.currentBoard[item] === this.state.playerTwoSymbol) count += 1;
              if (this.state.currentBoard[item] === "") empty += 1;
            })
            if (count === 1 && empty === 2) {
              for (let j = 0; j < this.state.winCombos[i].length; j++) {

                if (this.state.currentBoard[this.state.winCombos[i][0]] !== "") obj[this.state.winCombos[i][2]] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
                if (this.state.currentBoard[this.state.winCombos[i][2]] !== "") obj[this.state.winCombos[i][0]] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;

                break;
              }
              break;
            }
          }
        }

        setTimeout(() => {
          this.setState({
            currentBoard: Object.assign({}, this.state.currentBoard, obj),
            playerSymbol: (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol,
            count: this.state.count + 1,
            block: false,
            turnTwoPlayer: this.state.turnOnePlayer ? true : false,
            turnOnePlayer: this.state.turnTwoPlayer ? true : false,
          })
        }, 1000);
      }
    }
  }


  handelSelect(e) {
    this.setState({
      activeStarter: true,
      activeSelect: false,
      computerMode: e.target.value === "computer" ? true : false
    })
  }

  handelBack() {
    this.setState({
      activeStarter: false,
      activeSelect: true
    })
  }

  handelChoice(e) {
    let turn = Math.random() > 0.5 ? true : false;
    this.setState({
      playerOneSymbol: e.target.value,
      playerTwoSymbol: (e.target.value === "x") ? "o" : "x",
      turnOnePlayer: turn,
      turnTwoPlayer: !turn,
      activeField: true,
      activeStarter: false,
      activeSelect: false,
      activeTopPanel: true,
      block: (this.state.computerMode && !turn) ? true : false
    })
  }

  handelReset() {
    this.setState(defaultState)
  }

  play(e) {
    if (!e.target.innerHTML) {
      let obj = {};
      obj[e.target.id] = (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol;
      this.setState({
        currentBoard: Object.assign({}, this.state.currentBoard, obj),
        playerSymbol: (this.state.turnOnePlayer) ? this.state.playerOneSymbol : this.state.playerTwoSymbol,
        count: this.state.count + 1,
        block: this.state.computerMode ? true : false,
        turnTwoPlayer: this.state.turnOnePlayer ? true : false,
        turnOnePlayer: this.state.turnTwoPlayer ? true : false,
        computerTurnSecond: this.state.computerTurnFirst ? false : true
      })
    }
  }

  render() {
    let activeBoard = this.state.activeBoard ? "game-board active" : "game-board";
    let activeTopPanel = this.state.activeTopPanel ? "top-panel active" : "top-panel";
    return (
      <div>
        <div className="outter-container">
          <TopPanel activeTopPanel={activeTopPanel}
            handelReset={this.handelReset}
            turnOnePlayer={this.state.turnOnePlayer}
            turnTwoPlayer={this.state.turnTwoPlayer}
            scoreOnePlayer={this.state.scoreOnePlayer}
            scoreTwoPlayer={this.state.scoreTwoPlayer}
            win={this.state.win}
            draw={this.state.draw}
            computerMode={this.state.computerMode}
          />
          <div className="border-container">
            {this.state.activeSelect && <GameSelect handelSelect={this.handelSelect} />}

            {this.state.activeStarter && <GameStarter
              handelBack={this.handelBack}
              handelChoice={this.handelChoice}
              computerMode={this.state.computerMode}
            />}
            <GameBorder activeBoard={activeBoard}
              draw={this.state.draw}
              win={this.state.win}
              turnOnePlayer={this.state.turnOnePlayer}
              computerMode={this.state.computerMode}
            />
            {this.state.activeField &&
              <GameField turnPlayerSymbol={this.state.turnPlayerSymbol}
                play={this.play}
                currentBoard={this.state.currentBoard}
                winCombo={this.state.winCombo}
                block={this.state.block}
              />}
          </div>
        </div>
        <p><a href="https://github.com/codebysergeyivanov/tic-tac-toe-game">GitHub</a></p>
      </div>
    );
  }
}

export default App;
