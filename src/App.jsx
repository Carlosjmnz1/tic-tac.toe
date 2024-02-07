import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS, WINNER_COMBOS } from './constants';
import { WinerModal } from './components/WinnerModal';


function App() {
  const [board, setBoard]= useState(
    Array(9).fill(null)
    )
  const [turn, setTurn] = useState(TURNS.x)
  // null no hay ganador, false empate
  const [winner, setWinner] = useState(null)

  const checkWInner = (boardToCheck)=>{
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        ){
          return boardToCheck[a]
        }
    }
    //si no hay ganador
    return null
  }

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null);
  }

  const checkEndGame =(newBoard)=>{
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index)=>{
    //si el board contiene algo no deja sobreescribir
    if(board[index] || winner) return 
    //actualizar board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //actualizar turno
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);

    const newWinner = checkWInner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)//empate
    }
  }

  return(
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className='game'>
      {
        board.map((square, index) =>{
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {square}
              </Square>
          )
        })
      }
      </section>
      <section className='turn'>
        <Square isSelected={turn ===TURNS.x}>
          {TURNS.x}
          </Square>
        <Square isSelected={turn ===TURNS.o}>
          {TURNS.o}
          </Square>
      </section>
        <WinerModal resetGame={resetGame} winner={winner} />
    </main>
  ) 
}

export default App
