import React, { FC, useState, useEffect } from 'react'
import { Board, Cell } from '../models'
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    useEffect(() => {
        highlightCells();
    }, [selectedCell])

    const clickCell = (cell: Cell) => {

        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
            updateBoard();
        }else{
            setSelectedCell(cell);
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
    )
}

export default BoardComponent;
