function printBoard(path) {
  const board = [];
  for (let i = 0; i < 8; i += 1) {
    board[i] = [];
    for (let j = 0; j < 8; j += 1) {
      board[i][j] = '';
    }
  }
  if (path) {
    path.forEach((coordinate, index) => {
      board[coordinate[1]][coordinate[0]] = index;
    });
  }
  console.table(board);
}