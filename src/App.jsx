import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import './App.css';
import {WINNING_COMBINATIONS} from './winning-combinations';

const PLAYERS = {
    X:'Player 1',
    O: 'Player 2'
  };

const INTIAL_GAME_BOARD = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
];

function driveActivePlayer(gameTurn)
{
    let currentplayer = 'X';

    if(gameTurn.length > 0 && gameTurn[0].player === 'X')
    {
      currentplayer = 'O';

    }

    return currentplayer;
}

function deriveGameBoard(gameTurns)
{
  let gameBoard =  [...INTIAL_GAME_BOARD.map(array => [...array])];

    for(const trun of gameTurns)
    {
        const {square,player} = trun;
        const {row,col} = square;

        gameBoard[row][col]= player;
    }

    return gameBoard;
}

function deriveWinner(gameBoard,players)
{
    let winner;
    for(const combination of WINNING_COMBINATIONS)
    {
        let firstSquareSymbol = gameBoard[combination[0]['row']][combination[0]['column']];
        let secoundSquareSymbol = gameBoard[combination[1]['row']][combination[1]['column']];
        let thirdSquareSymbol = gameBoard[combination[2]['row']][combination[2]['column']];

        if(firstSquareSymbol && firstSquareSymbol === secoundSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
        {
          winner = players[firstSquareSymbol];
        }
    }

    return winner;
}

function App() 
{
  const [players,setPlayers] = useState(PLAYERS);

  const [gameTurns,setGameTurns] = useState([]);

  const activePlayer = driveActivePlayer(gameTurns);

  function handleSelectSquarSymbol(rowIndex,colIndex)
  {
     setGameTurns((prevTurns) => {

        const currentPlayer = driveActivePlayer(prevTurns);
    
        const updatedTurns = [{square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevTurns];

        return updatedTurns;

      }
    
    );
  }

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard,players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRematch()
  {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName)
  {
    setPlayers(prevnPlayers => {
      return {
        ...prevnPlayers,
        [symbol]:newName
      }
      
    });
  }



  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player 
            name={PLAYERS.X} 
            symbol="X" 
            isActive={activePlayer === 'X'} 
            onNameChange={handlePlayerNameChange}
          />
          <Player 
            name={PLAYERS.O}
            symbol="O" 
            isActive={activePlayer === 'O'}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) ? <GameOver winner={winner} onRestart={handleRematch}></GameOver>:undefined}
        <GameBoard onSelectSquarSymbol={handleSelectSquarSymbol} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
