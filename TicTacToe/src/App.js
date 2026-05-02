import { useEffect, useState } from "react";
import { database } from "./firebase";
import { ref, set, onValue, update, get } from "firebase/database";
import "./styles.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ game, playerSymbol, roomId }) {
  const squares = game.squares || Array(9).fill("");
  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (winner || squares[i]) return;

    const isMyTurn =
      (game.xIsNext && playerSymbol === "X") ||
      (!game.xIsNext && playerSymbol === "O");

    if (!isMyTurn) return;

    const nextSquares = squares.slice();
    nextSquares[i] = playerSymbol;

    update(ref(database, "rooms/" + roomId), {
      squares: nextSquares,
      xIsNext: !game.xIsNext,
    });
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = game.xIsNext ? "Next player: X" : "Next player: O";
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="status">You are: {playerSymbol}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [roomInput, setRoomInput] = useState("");
  const [roomId, setRoomId] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState("");
  const [game, setGame] = useState(null);

  async function createRoom() {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();

    const newGame = {
      squares: Array(9).fill(""),
      xIsNext: true,
      players: {
        X: true,
        O: false,
      },
    };

    await set(ref(database, "rooms/" + newRoomId), newGame);

    setRoomId(newRoomId);
    setPlayerSymbol("X");
  }

  async function joinRoom() {
    const code = roomInput.trim().toUpperCase();
    const roomRef = ref(database, "rooms/" + code);
    const snapshot = await get(roomRef);

    if (!snapshot.exists()) {
      alert("Room not found");
      return;
    }

    const roomData = snapshot.val();

    if (roomData.players.O) {
      alert("Room is already full");
      return;
    }

    await update(roomRef, {
      "players/O": true,
    });

    setRoomId(code);
    setPlayerSymbol("O");
  }

  useEffect(() => {
    if (!roomId) return;

    const roomRef = ref(database, "rooms/" + roomId);

    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setGame(data);
    });

    return () => unsubscribe();
  }, [roomId]);

  if (!roomId) {
    return (
      <div className="game-menu">
        <h1>Online Tic Tac Toe</h1>

        <button onClick={createRoom}>Create Game</button>

        <div>
          <input
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            placeholder="Enter room code"
          />
          <button onClick={joinRoom}>Join Game</button>
        </div>
      </div>
    );
  }

  if (!game) {
    return <p>Loading room...</p>;
  }

  return (
    <div className="game">
      <div className="game-board">
        <h2>Room Code: {roomId}</h2>
        <Board game={game} playerSymbol={playerSymbol} roomId={roomId} />
      </div>
    </div>
  );
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
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

// import { useState, useEffect } from 'react';

// function Square({ value, onSquareClick }) {
//   return (
//     <button className="square" onClick={onSquareClick}>
//       {value}
//     </button>
//   );
// }

// function Board({ xIsNext, squares, onPlay }) {
//   function handleClick(i) {
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     const nextSquares = squares.slice();
//     if (xIsNext) {
//       nextSquares[i] = 'X';
//     } else {
//       nextSquares[i] = 'O';
//     }
//     onPlay(nextSquares);
//   }

//   const winner = calculateWinner(squares);
//   let status;
//   if (winner) {
//     status = 'Winner: ' + winner;
//   } else {
//     status = 'Next player: ' + (xIsNext ? 'X' : 'O');
//   }

//   return (
//     <>
//       <div className="status">{status}</div>
//       <div className="board-row">
//         <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
//         <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
//         <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
//         <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
//         <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
//         <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
//         <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
//       </div>
//     </>
//   );
// }

// export default function Game() {
  
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const [currentMove, setCurrentMove] = useState(0);
//   const [showPopup, setShowPopup] = useState(true);
//   const currentSquares = history[currentMove];
//   const xIsNext = currentMove % 2 === 0;

//   function handlePlay(nextSquares) {
//     const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
//     setHistory(nextHistory);
//     setCurrentMove(nextHistory.length - 1);
    
//   }

//   function jumpTo(nextMove) {
//     setCurrentMove(nextMove);
//   }

//   const moves = history.map((squares, move) => {
//     let description;
//     if (move > 0) {
//       description = 'Go to move #' + move;
//     } else {
//       description = 'Go to game start';
//     }
//     return (
//       <li key={move}>
//         <button onClick={() => jumpTo(move)}>{description}</button>
//       </li>
//     );
//   });
//   const winner = calculateWinner(currentSquares);
//   useEffect(() => {
//   if (winner) {
//     setShowPopup(true); // show when new winner appears
//   }
//   }, [winner]);
//   return (
//     <div className="game">
//       {winner && showPopup && (
//         <div className="win-popup">
//           <div className="win-card">
//             <button
//               className="close-btn"
//               onClick={() => setShowPopup(false)}
//             >
//               ✕
//             </button>
//             <img
//               src="https://media.tenor.com/2roX3uxz_68AAAAM/monkey-monkey-dance.gif"
//               alt="Monkey celebration"
//             />
//             <h2>{winner} wins!</h2>
//           </div>
//         </div>
//       )}`
//       <div className="game-board">
//         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
//       </div>
//       <div className="game-info">
//         <ol>{moves}</ol>
//       </div>
//     </div>
//   );
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }
