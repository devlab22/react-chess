import React, { FC, useState, useEffect } from 'react'
import { Board, Cell, Player } from '../models'
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void; 
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    useEffect(() => {
        highlightCells();
    }, [selectedCell])

    const clickCell = (cell: Cell) => {

        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
            updateBoard();
            swapPlayer();
        }else{
            if(cell.figure?.color === currentPlayer?.color){
                setSelectedCell(cell);
            }
            
        }

    }

    const highlightCells = () => {
        board.highlightCells(selectedCell);
        updateBoard()
    }

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3 className='header'>Current Player: {currentPlayer?.color}</h3>
        <div className='board'>
            {
                board.cells.map((row, index) => (
                    <React.Fragment key={index}>
                        {
                            row.map(cell =>                               
                                    <CellComponent 
                                        onClickCell={clickCell}
                                        cell={cell} 
                                        selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y ? true : false}
                                        key={cell.id}
                                    />
                            )
                        }
                    </React.Fragment>
                ))
            }
        </div>
        </div>
    )
}

export default BoardComponent;
