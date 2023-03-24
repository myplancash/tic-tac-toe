import React, { useState } from 'react'
import Board from './Board'

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascending, setAscending] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquare = history[currentMove];
  

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove)
  }

  const sortMoves = () => {
    setAscending(!ascending)
  }

  //Add a toggle button that lets you sort the moves in either ascending or descending order.
  const moves = history.map((step, move, history) => {
    const latestMoveSquare = step.latestMoveSquare;
    const col = 1 + latestMoveSquare % 3;
    const row = 1 + Math.floor(latestMoveSquare / 3);

    let description;
    if(move > 0) {
      description = `Go to Move #  + ${move} + (${col},${row})`
    } else {
      description = 'Go to game start'
    }

    return (
      <li key={move}>
        { history[move] && <p style={{ fontSize: '16px' }}>{`You are at move # ${move}`}</p> }
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })


  return (
    <div className='game'>
      <div className='game-board'>
        <Board
         /*  history={history}
          setHistory={setHistory} */
          xIsNext={xIsNext} 
          squares={currentSquare} 
          onPlay={handlePlay}
        />
      </div>
      <button className='toggle' onClick={sortMoves}>Toggle Moves</button>
      <div className='game-info'>
        <ol>
          {ascending ? moves : moves.reverse()}
        </ol>
      </div>
    </div>
  )
}

export default Game;
