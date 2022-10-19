import React, {useState, useEffect} from 'react';
import './App.css'
import { BoardComponent } from './components';
import { Board } from './models';

const App = () => {

  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    console.count('restart')
    restart();
  }, [])

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);

  }
  return (
    <div className='app'>
      <BoardComponent board={board} setBoard={setBoard}/>
    </div>
  );
};

export default App;
