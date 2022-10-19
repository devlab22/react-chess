import React, {FC} from 'react'
import { Cell } from '../models'

interface CellProps{
    cell: Cell;
    selected: boolean;
    onClickCell: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, onClickCell}) => {
    return (
        <div className={`cell ${cell.color} ${selected ? "selected" : ""} ${cell.available && cell.figure ? 'fight' : ''}`} onClick={() => onClickCell(cell)}>

            {cell.available && !cell.figure && <div className='available'></div>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure.name}/>}
        </div>
    )
}

export default CellComponent;