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

  isValidMove(prevY: number, prevX: number, currY: number, currX: number, type: pieceType, team: pieceTeam, boardState: Piece[]) {
    console.log("Referee is checking the move...")
    console.log(`prev loc (x,y):(${prevX},${prevY})`)
    console.log(`current loc (x,y):(${currX},${currY})`)
    console.log(`Type piece:(${type})`)
    console.log(`Type Team:(${team})`)
    console.log('Board State : (', boardState, ')')

    // REFACTORING

    if (type === pieceType.Pawn) {
      const specialRow = (team === pieceTeam.Our) ? 1 : 6;
      const pawnDirection = (team === pieceTeam.Our) ? 1 : -1;

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
    }


    // if (type === pieceType.Pawn) {
    //   const specialRow = (team === pieceTeam.Our) ? 1 : 6;
    //   const pawnDirection = (team === pieceTeam.Our) ? 1 : -1;

    //   if (prevY === specialRow) {
    //     if (prevX === currX && currY - prevY === pawnDirection) {
    //       if (!this.isOccupied(currY, currX, boardState)) {
    //         console.log("valid move!")
    //         return true;
    //       }
    //     } else if (prevX === currX && currY - prevY === 2 * pawnDirection) {
    //       if (!this.isOccupied(currY, currX, boardState) && !this.isOccupied(currY - pawnDirection, currX, boardState)) {
    //         console.log("valid move!")
    //         return true;
    //       }
    //     }
    //   } else {
    //     if (prevX === currX && currY - prevY === pawnDirection) {
    //       if (!this.isOccupied(currY, currX, boardState)) {
    //         console.log("valid move~!")
    //         return true;
    //       }
    //     }
    //   }
    // }


    // if (type === pieceType.Pawn) {
    //   if (team === pieceTeam.Our) {
    //     if (prevY === 1) {

    //       if (prevX === currX && (currY - prevY) === 2) {
    //         if (!this.isOccupied(currY, currX, boardState) && !this.isOccupied(currY - 1, currX, boardState)) {
    //           console.log("valid move!")
    //           return true;
    //         }
    //       }

    //       if (prevX === currX && (currY - prevY) === 1) {
    //         if (!this.isOccupied(currY, currX, boardState)) {
    //           console.log("valid move!")
    //           return true;
    //         }
    //       }
    //     } else {
    //       if (prevX === currX && ((currY - prevY) === 1)) {
    //         if (!this.isOccupied(currY, currX, boardState)) {
    //           console.log("valid move!")
    //           return true;
    //         }
    //       }
    //     }
    //   } else {
    //     if (prevY === 6) {

    //       if (prevX === currX && (currY - prevY) === -1) {
    //         if (!this.isOccupied(currY, currX, boardState)) {
    //           console.log("valid move~!")
    //           return true;
    //         }
    //       }

    //       if (prevX === currX && (currY - prevY) === -2) {
    //         if (!this.isOccupied(currY, currX, boardState) && !this.isOccupied(currY + 1, currX, boardState)) {
    //           console.log("valid move~!")
    //           return true;
    //         }
    //       }
    //     } else {
    //       if (prevX === currX && ((currY - prevY) === -1)) {
    //         if (!this.isOccupied(currY, currX, boardState)) {
    //           console.log("valid move~!")
    //           return true;
    //         }
    //       }
    //     }
    //   }
    // }
    return false;
  }
}