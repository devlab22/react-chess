import {Figure} from './figures/Figure'
import {Bishop, King, Knight, Pawn, Queen, Rook, Cell, Colors} from '../models'

export class Board {
    cells: Cell[][] = [];
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];

    public initCells() {

        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null))  // black
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null))  // white
                }

            }

            this.cells.push(row)
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    public addFigures() {
        
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.WHITE, this.getCell(i, 6))
            new Pawn(Colors.BLACK, this.getCell(i, 1))

            switch (i) {
                case 0:
                case 7:
                    new Rook(Colors.WHITE, this.getCell(i, 7));
                    new Rook(Colors.BLACK, this.getCell(i, 0));
                    break;
                case 1:
                case 6:
                    new Knight(Colors.WHITE, this.getCell(i, 7));
                    new Knight(Colors.BLACK, this.getCell(i, 0));
                    break;
                case 2:
                case 5:
                    new Bishop(Colors.WHITE, this.getCell(i, 7));
                    new Bishop(Colors.BLACK, this.getCell(i, 0));
                    break;
                case 3:
                    new Queen(Colors.WHITE, this.getCell(i, 7));
                    new Queen(Colors.BLACK, this.getCell(i, 0));
                    break;
                case 4:
                    new King(Colors.WHITE, this.getCell(i, 7));
                    new King(Colors.BLACK, this.getCell(i, 0));
                    break;
            }
        }

    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }

    public getCopyBoard() : Board {
        const newBoard = new Board()
        newBoard.cells = this.cells;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        return newBoard;
    }

    addLostFigure(figure: Figure) {

        figure.color === Colors.WHITE
            ? this.lostWhiteFigures.push(figure)
            : this.lostBlackFigures.push(figure)
    }

}
