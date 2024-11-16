import Chess from 'https://unpkg.com/chess.js@1.0.0-beta.8/dist/chess.js';
import ChessBoard from 'https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.js';
import $ from 'https://code.jquery.com/jquery-3.7.1.min.js';

var board1 = ChessBoard('board1', {
    draggable: true,
    position: 'start'
})

// $(document).ready(() => {
//     const board = Chessboard('board1')
// })

console.log('we got here')