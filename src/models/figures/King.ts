import { Figure, FigureNames } from './Figure';
import { Cell, Colors } from '../../models';

import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';

export class King extends Figure {

    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    moveFigure(target: Cell): void {
        super.moveFigure(target);
        this.isFirstStep = false;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }

        const direction = 1;
        if ((target.y === this.cell.y + direction ||
            (target.y === this.cell.y - direction))
            && target.x === this.cell.x) {
            return true;
        }

        if ((target.x === this.cell.x + direction ||
            (target.x === this.cell.x - direction))
            && target.y === this.cell.y) {
            return true;
        }

        if ((target.y === this.cell.y + direction || target.y === this.cell.y - direction)
            && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)) {
            return true;
        }

        if(!this.underAttack(target)){
            return true;
        }


        return false;
    }

    underAttack(target: Cell) : boolean{
        return false;
    }
}