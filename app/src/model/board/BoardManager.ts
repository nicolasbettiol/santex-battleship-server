import Board = require("./Board");
import CellValue = require("./CellValue");
import db  = require("../../../db");
import BoardStatus = require("./board.constants");

class BoardManager{

    constructor(){
    }

    hasShip(positionValue: number){
        // All ship has a value equals or bigger than 10. 
        // Each ship is represent with the values 10, 20, 30 or 40
        // When a cell is hitted, this value is move to negative.
        const SHIP_VALUE = 10;
        return positionValue >= SHIP_VALUE;
    }

    shot(boardId: string, x: number, y: number) : void {
        var playerBoard = <Board> db.boards.get(boardId);        
        const posValue = playerBoard.board[x][y]
        if(this.hasShip(posValue)){
            console.log("Ship beated");
            playerBoard.board[x][y] = this.getShipHitedValue(posValue);
            this.validateSunken(posValue, playerBoard);
            db.boards.update(playerBoard);
        }
        if(posValue === CellValue.WATER){
            console.log("Water...");
            playerBoard.board[x][y] = CellValue.HIT_WATER;
            db.boards.update(playerBoard);
        }
        this.printBoard(playerBoard);
    }

    validateSunken(posValue: number, playerBoard: Board) : void {
        var isSunken = true;
        playerBoard.board.forEach(row => {
           row.forEach(cell => {
               if(cell === posValue){
                isSunken = false;
               }
           }); 
        });        
        if(isSunken){
            console.log("Ship shunked");
            playerBoard.board.forEach((row, x) => {
                row.forEach((value, y) => {
                    if(value === this.getShipHitedValue(posValue)){
                        playerBoard.board[x][y] = CellValue.SUNKED;
                    }
                }); 
            });
            this.validateAllShipSunken(playerBoard);
        }
    }

    validateAllShipSunken(playerBoard : Board) : void{
        var allSunken = true;
        playerBoard.board.forEach(row => {
            row.forEach(cell => {
                if(this.hasShip(cell)){
                    allSunken = false;
                }
            }); 
         });
         if(allSunken){
            console.log("All ship sunken!");
            playerBoard.status = BoardStatus.SUNKEN.toString();
         }
    }

    getShipHitedValue(positionValue: number): number{
        return positionValue * - 1;
    }

    printBoard(playerBoard: Board){
        console.log("");
        playerBoard.board.forEach(element => {
            console.log(element);      
        });
    }
}

export = BoardManager;