import React, {useState, useEffect} from 'react';
import './App.css'
import { BoardComponent, LostFigures, Timer } from './components';
import { Board, Player, Colors } from './models';

const App = () => {

  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, [])

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);

  }

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className='app'>
      {/* <Timer 
        restart={restart}
        currentPlayer={currentPlayer}
        secondsGame={300}
        /> */}
      <BoardComponent 
        board={board} 
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        />
      <div>
        <LostFigures title='black Figures' figures={board.lostBlackFigures}/>
        <LostFigures title='white Figures' figures={board.lostWhiteFigures}/>
      </div>
    </div>
  );
};

export default App;
