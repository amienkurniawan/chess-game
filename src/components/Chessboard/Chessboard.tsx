import './Chessboard.css';

import Tile from '../Tile/Tile';

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
  let type = position == 0 ? 'b' : 'w';
  let y = position == 0 ? 7 : 0;

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

export default function Chessboard() {
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
  return <div id='chessboard'>{board}</div>
}