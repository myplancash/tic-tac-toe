import React from 'react'
import Square from './components/Square';

export default function Board({xIsNext, squares, onPlay, history, setHistory}) {


  const handleClick = (i) => {
    /* setHistory([...history.concat([{
      squares: squares,
      latestMoveSquare: i
    }])]) */

    if(calculateWinner(squares) || squares[i]) return

    const nextSquares = squares.slice()

    if(xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    onPlay(nextSquares)

    
  }

  //When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).

  // winner status here
  const winner = calculateWinner(squares)
  let status;
  if(winner) {
    status = "Winner: " + winner.player + 'at lines: ' + winner.lines   
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  // renderSquare,arg = i 

  const winningSquares = winner ? winner.lines : [];
  
  const renderSquare = (i) => {
    return (
      <Square 
        isWinning={winningSquares.includes(i)}      
        value={squares[i]} 
        onSquareClick={() => handleClick(i)}
      />
    )
  }
 
  // boardSquares loops here
  const boardSquares = [];
  for(let row=0; row < 3; row++) {
    const boardRow = [];
    for(let col=0; col < 3; col++) {
      boardRow.push(
        <span key={(row * 3) + col}>{renderSquare((row * 3) + col)}</span>
      )
    }
    boardSquares.push(<div key={row} className='board-row'>{boardRow}</div>)
  }

  return (
    <div>
      <div className='status'>
        {status}
      </div>
      <div>
        {boardSquares}
      </div>      
    </div>
  )   
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for(let i=0; i < lines.length; i++) {
    const [a,b,c] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], lines: [a,b,c] };
    }
  }
  return null
}
