import logo from '../../assets/black-king.png';
import { Cell, Colors } from "../../models";

export enum FigureNames{
    FIGURE = "Figure",
    KING = "King",
    KNIGHT = "Knight",
    PAWN = "Pawn",
    QUEEN = "Queen",
    ROOK = "Rook",
    BISHOP = "Bishop"
}

export class Figure{
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color:Colors, cell:Cell){
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random()
    }

    canMove(target:Cell) : boolean{

        if(target.figure?.color === this.color){
            return false;
        }

        if(target.figure?.name === FigureNames.KING){
            return false;
        }
        
        return true
    }

    moveFigure(target:Cell){
        
    }

    canAttack(target: Cell) : boolean{

        if(this.canMove(target)){
            return true;
        }
        return false;
    }

    isKingUnderAttack() : boolean{
        
        const target = this.cell.getCell4Figure(FigureNames.KING, this.color);
        if(target === null){
            return false;
        }
        
        if(this.cell.isUnderAttack(target, target.figure)){
            return true;
        }

        return false;
    }

    
}