import React, { useState } from 'react';
import '../Styles/dashboard.css';
import swal from 'sweetalert';

const TicTacToe = () => {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameBoard, setGameBoard] = useState(Array(9).fill(''));
  const [gameActive, setGameActive] = useState(true);

  const handleClick = (index) => {
    if (gameBoard[index] === '' && gameActive) {
      const updatedBoard = [...gameBoard];
      updatedBoard[index] = currentPlayer;

      setGameBoard(updatedBoard);

      if (checkWinner(updatedBoard)) {
        animateWin();
        setTimeout(() => {
          swal(`Player ${currentPlayer} wins!`);
          resetGame();
        }, 1000);
      } else if (updatedBoard.every(cell => cell !== '')) {
        swal("It's a draw!");
        resetGame();
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  const checkWinner = (board) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    return winConditions.some(condition => {
      const [a, b, c] = condition;
      return board[a] !== '' && board[a] === board[b] && board[b] === board[c];
    });
  };

  const animateWin = () => {
    const winConditions = getWinningLine();

    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell, index) => {
      if (winConditions.includes(index)) {
        cell.innerHTML += '<div class="win-animation"></div>';
      }
    });
  };

  const getWinningLine = () => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
        return condition;
      }
    }

    return [];
  };

  const resetGame = () => {
    setGameBoard(Array(9).fill(''));
    setGameActive(true);
    setCurrentPlayer('X');
  };

  return (
    <>
      <h1 style={{marginLeft:"80px", color:"red"}}>Tic Tac Toe</h1>
      <div className="board">
        {gameBoard.map((value, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
    </>
  );
};

export default TicTacToe;
