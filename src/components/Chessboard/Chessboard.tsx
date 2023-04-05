import './Chessboard.css';

import Tile from '../Tile/Tile';
import { useRef } from 'react';

const HorizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const VerticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];

interface Piece {
  image: string;
  x: number;
  y: number;
}
const pieces: Piece[] = [];

// black
for (let xindex = 0; xindex <= 7; xindex++) {
  pieces.push(
    { image: 'assets/images/pawn_b.png', x: xindex, y: 6 },
  )
}

for (let position = 0; position < 2; position++) {
  let type = position === 0 ? 'b' : 'w';
  let y = position === 0 ? 7 : 0;

  pieces.push(
    { image: `assets/images/rook_${type}.png`, x: 0, y },
    { image: `assets/images/knight_${type}.png`, x: 1, y },
    { image: `assets/images/bishop_${type}.png`, x: 2, y },
    { image: `assets/images/queen_${type}.png`, x: 3, y },
    { image: `assets/images/king_${type}.png`, x: 4, y },
    { image: `assets/images/bishop_${type}.png`, x: 5, y },
    { image: `assets/images/knight_${type}.png`, x: 6, y },
    { image: `assets/images/rook_${type}.png`, x: 7, y },
  )
}

// white
for (let xindex = 0; xindex <= 7; xindex++) {
  pieces.push(
    { image: 'assets/images/pawn_w.png', x: xindex, y: 1 }
  )
}

let activePiece: HTMLElement | null = null;


export default function Chessboard() {
  let chessboardRef = useRef<HTMLDivElement>(null);



  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;

    if (element.classList.contains("chess-piece")) {
      const x = e.clientX - 50;
      const y = e.clientY - 50;

      element.style.position = 'absolute';
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      activePiece = element;
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
    if (activePiece) {
      activePiece = null;
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