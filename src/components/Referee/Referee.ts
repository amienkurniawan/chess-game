import { pieceTeam, pieceType } from "../Chessboard/Chessboard";

export default class Referee {
  isValidMove(prevY: number, prevX: number, currY: number, currX: number, type: pieceType, team: pieceTeam) {
    console.log("Referee is checking the move...")
    console.log(`prev loc (x,y):(${prevX},${prevY})`)
    console.log(`current loc (x,y):(${currX},${currY})`)
    console.log(`Type piece:(${type})`)
    console.log(`Type Team:(${team})`)

    if (type === pieceType.Pawn) {
      if (team === pieceTeam.Our) {
        if (prevY === 1) {
          if (prevX === currX && ((currY - prevY) === 2 || (currY - prevY) === 1)) {
            console.log("valid move!")
            return true;
          }
        } else {
          if (prevX === currX && ((currY - prevY) === 1)) {
            console.log("valid move!")
            return true;
          }
        }
      }
    }
    return false;
  }
}