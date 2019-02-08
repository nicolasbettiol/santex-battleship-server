import Board = require("./Board");
import CellValue = require("./CellValue");
import db  = require("../../../db");

class BoardManager{

    constructor(){
    }

    hasShip(positionValue: number){
        const SHIP_VALUE = 10;
        return positionValue >= SHIP_VALUE;
    }

    shot(boardId: string, x: number, y: number) : void {
        const board = <Board> db.boards.get(boardId);        
        var posValue = board.board[x][y]
        if(this.hasShip(posValue)){
            board.board[x][y] = this.getShipHitedValue(posValue);
            this.validateSunken(posValue, board);
            db.boards.update(board);
            return;
        }
        if(posValue === CellValue.WATER){
            board.board[x][y] = CellValue.HIT_WATER;
            db.boards.update(board);
            return;
        }
    }

    validateSunken(posValue: number, board: Board) : void {
        var isSunken = true;
        board.board.forEach(row => {
           row.forEach(cell => {
               if(cell === posValue){
                isSunken = false;
               }
           }); 
        });        
        if(isSunken){
            board.board.forEach((row, x) => {
                row.forEach((value, y) => {
                    if(value === this.getShipHitedValue(posValue)){
                        board.board[x][y] = CellValue.SUNKED;
                    }
                }); 
            });
        }
    }

    getShipHitedValue(positionValue: number): number{
        return positionValue * - 1;
    }
}

export = BoardManager;