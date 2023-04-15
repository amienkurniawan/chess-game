import './Chessboard.css';

import { useRef, useState } from 'react';

import Referee from '../Referee/Referee';
import Tile from '../Tile/Tile';

const HorizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const VerticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];

export interface Piece {
  image: string;
  x: number;
  y: number;
  type: pieceType;
  team: pieceTeam;
}

export enum pieceType {
  Pawn,
  Bishop,
  Knight,
  Rook,
  Queen,
  King
}

export enum pieceTeam {
  Opponent,
  Our
}

const initialBoardState: Piece[] = [];

// Black Tile
for (let xindex = 0; xindex <= 7; xindex++) {
  initialBoardState.push(
    { image: 'assets/images/pawn_b.png', x: xindex, y: 6, type: pieceType.Pawn, team: pieceTeam.Opponent },
  )
}

// White Tile
for (let xindex = 0; xindex <= 7; xindex++) {
  initialBoardState.push(
    { image: 'assets/images/pawn_w.png', x: xindex, y: 1, type: pieceType.Pawn, team: pieceTeam.Our }
  )
}

// Other Tile
for (let position = 0; position < 2; position++) {
  const teamType = (position === 0) ? pieceTeam.Opponent : pieceTeam.Our;
  let type = (teamType === pieceTeam.Opponent) ? 'b' : 'w';
  let y = position === 0 ? 7 : 0;

  initialBoardState.push(
    { image: `assets/images/rook_${type}.png`, x: 0, y, type: pieceType.Rook, team: teamType },
    { image: `assets/images/knight_${type}.png`, x: 1, y, type: pieceType.Knight, team: teamType },
    { image: `assets/images/bishop_${type}.png`, x: 2, y, type: pieceType.Bishop, team: teamType },
    { image: `assets/images/queen_${type}.png`, x: 3, y, type: pieceType.Queen, team: teamType },
    { image: `assets/images/king_${type}.png`, x: 4, y, type: pieceType.King, team: teamType },
    { image: `assets/images/bishop_${type}.png`, x: 5, y, type: pieceType.Bishop, team: teamType },
    { image: `assets/images/knight_${type}.png`, x: 6, y, type: pieceType.Knight, team: teamType },
    { image: `assets/images/rook_${type}.png`, x: 7, y, type: pieceType.Rook, team: teamType },
  )
}


export default function Chessboard() {
  const referee = new Referee();

  let chessboardRef = useRef<HTMLDivElement>(null);
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState); // adalah posisi dari setiap bidak atau pion di dalam papan catur/ chessboard
  const [gridX, setGridX] = useState(0); // adalah state dari piece/pion yang saat itu sedang digerakkan posisi X
  const [gridY, setGridY] = useState(0); // adalah state dari piece/pion yang saat itu sedang digerakkan posisi y


  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;


    if (element.classList.contains("chess-piece") && chessboard) {

      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
      setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      element.style.position = 'absolute';
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }

  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      activePiece.style.position = 'absolute';
      activePiece.style.left = `${x}px`;
      activePiece.style.top = `${y}px`;

      const minX = chessboard.offsetLeft - 30;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 70;

      const minY = chessboard.offsetTop - 25;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 80;

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }

  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      let x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      let y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));

      const currentPiece = pieces.find(p => p.x === gridX && p.y === gridY); // posisi lokasi ketika pion didrop 
      const attackedPiece = pieces.find(p => p.x === x && p.y === y);

      if (currentPiece) {
        const validMove = referee.isValidMove(gridY, gridX, y, x, currentPiece?.type, currentPiece?.team, pieces)
        if (validMove) {
          // UPDATE THE PIECE POSITION
          // AND IF POSITION IS ATTACK REMOVE PIECE


          const updatedValue = pieces.reduce((results, piece) => {
            if (piece.x === currentPiece.x && piece.y === currentPiece.y) {
              piece.x = x;
              piece.y = y;
              results.push(piece);
            } else if (!(piece.x === x && piece.y === y)) {
              results.push(piece)
            }
            return results;
          }, [] as Piece[])

          setPieces(updatedValue);
        } else {
          // RESET THE PIECE
          activePiece.style.position = "relative";
          activePiece.style.removeProperty('top');
          activePiece.style.removeProperty('left')
        }
      }
      setActivePiece(null);
    }
  }

  let board = [];
  for (let j = VerticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < HorizontalAxis.length; i++) {
      const number = i + j + 2;

      let image = undefined;

      pieces.forEach(p => {
        if (p.x === i && p.y === j) {
          image = p.image
        }
      })
      board.push(<Tile key={`${i},${j}`} image={image} number={number} />)

    }
  }
  return <div
    onMouseMove={e => movePiece(e)}
    onMouseDown={e => grabPiece(e)}
    onMouseUp={e => dropPiece(e)}
    id='chessboard'
    ref={chessboardRef}
  >{board}</div>
}