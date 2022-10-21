import {Figure, FigureNames} from './Figure'
import {Cell, Colors} from '../../models';
import blackLogo from '../../assets/black-rook.png';
import whiteLogo from '../../assets/white-rook.png';

export class Rook extends Figure{

    isFirstStep: boolean = true;

    constructor(color:Colors, cell:Cell){
        super(color,cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.ROOK;
    }

    public canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false;
        }

        if(this.cell.isEmptyVertical(target)){
            return true;
        }

        if(this.cell.isEmptyHorizontal(target)){
            return true;
        }

        return false;
    }

    moveFigure(target: Cell): void {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}