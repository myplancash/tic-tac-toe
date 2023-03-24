import React from 'react'

const Square = ({ value, onSquareClick, isWinning }) => {
  return (
    <button 
      className={`square  ${isWinning ? 'square--winning' : null}`}
      onClick={onSquareClick}>
      {value}
    </button>
  )
}

export default Square;
