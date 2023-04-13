import { Piece, pieceTeam, pieceType } from "../Chessboard/Chessboard";

export default class Referee {

  isOccupied(movingY: number, movingX: number, boardState: Piece[]) {
    const boardOccupied = boardState.find((p) => p.x === movingX && p.y === movingY)
    if (boardOccupied) {
      return true;
    } else {
      return false;
    }
  }

  tileIsOccupiedByOpponent(movingX: number, movingY: number, boardState: Piece[], movingTeam: pieceTeam): boolean {
    const boardOccupiedByOpponent = boardState.find((p) => p.x === movingX && p.y === movingY && p.team !== movingTeam);
    if (boardOccupiedByOpponent) {
      return true;
    } else {
      return false;
    }
  }

  isValidMove(prevY: number, prevX: number, currY: number, currX: number, type: pieceType, team: pieceTeam, boardState: Piece[]) {
    // console.log("Referee is checking the move...")
    // console.log(`prev loc (x,y):(${prevX},${prevY})`)
    // console.log(`current loc (x,y):(${currX},${currY})`)
    // console.log(`Type piece:(${type})`)
    // console.log(`Type Team:(${team})`)
    // console.log('Board State : (', boardState, ')')

    // REFACTORING

    if (type === pieceType.Pawn) {
      const specialRow = (team === pieceTeam.Our) ? 1 : 6;
      const pawnDirection = (team === pieceTeam.Our) ? 1 : -1;

      // Movement Logic
      if (prevX === currX && prevY === specialRow && currY - prevY === 2 * pawnDirection) {
        if (!this.isOccupied(currY, currX, boardState) && !this.isOccupied(currY - pawnDirection, currX, boardState)) {
          console.log("valid move!")
          return true;
        }
      } else if (prevX === currX && currY - prevY === pawnDirection) {
        if (!this.isOccupied(currY, currX, boardState)) {
          console.log("valid move!")
          return true;
        }
      }

      // Attack Logic
      else if (currX - prevX === -1 && currY - prevY === pawnDirection) {
        // Attack in upper or Bottom Left Corner
        console.log('upper or bottom left')
        if (this.tileIsOccupiedByOpponent(currX, currY, boardState, team)) {
          console.log('we can attact the enemy!')
          return true;
        }
      } else if (currX - prevX === 1 && currY - prevY === pawnDirection) {
        // Attack in upper or Bottom Right Corner
        console.log('upper or bottom right')
        if (this.tileIsOccupiedByOpponent(currX, currY, boardState, team)) {
          console.log('we can attact the enemy!')
          return true;
        }
      }
    }



    return false;
  }
}