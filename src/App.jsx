import { PropTypes } from 'prop-types'
import { useState } from 'react'
import './App.css'

function Square({ value, onSquareClick }){
  return(
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}
Square.propTypes = {
  value: PropTypes.string,
  onSquareClick: PropTypes.func
}

function Board({ xIsNext, squareList, onPlay }) {
  
  let winner = winnerCalculation(squareList)
  let statusMessage = ""

  if(winner) statusMessage = winner + " wins!"
  else statusMessage = (xIsNext? "X" : "O") + " turn."

  function handleClick(i){
    if(squareList[i] || winner) return
    
    const nextSquares = squareList.slice() //immutabiity
    
    if(xIsNext) nextSquares[i] = "X"
    else nextSquares[i] = "O"
    
    onPlay(nextSquares)
  }
  
  return (
    <>
      <div className="status">{statusMessage}</div>
      <div className="board-row">
        <Square value={squareList[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squareList[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squareList[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squareList[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squareList[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squareList[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squareList[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squareList[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squareList[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  )
}
Board.propTypes = {
  xIsNext: PropTypes.bool,
  squareList: PropTypes.array,
  onPlay: PropTypes.func
}

function winnerCalculation(squareList){
  const combinationList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < combinationList.length; i++) {
    const [a, b, c] = combinationList[i];
    if (squareList[a] && squareList[a] === squareList[b] && squareList[a] === squareList[c]) {
      return squareList[a];
    }
  }
  return null;

}

function App(){

  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]
  const xIsNext = currentMove % 2 === 0

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squareList, index) => {
    let description;
    if (index > 0) {
      description = 'Go to move #' + index;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squareList={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )
}

export default App