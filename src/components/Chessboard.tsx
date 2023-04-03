import './Chessboard.css';

import React from 'react';

const HorizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const VerticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Chessboard() {
  let board = [];
  for (let j = VerticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < HorizontalAxis.length; i++) {
      const color = i + j + 2;
      if (color % 2 === 0) {
        board.push(<div className="tile white-tile">[{HorizontalAxis[i]}{VerticalAxis[j]}] </div>)
      } else {
        board.push(<div className="tile black-tile">[{HorizontalAxis[i]}{VerticalAxis[j]}] </div>)
      }
    }
  }
  return <div id='chessboard'>{board}</div>
}