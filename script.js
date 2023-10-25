function checkValidity(current, target) {
  if (Array.isArray(current) && Array.isArray(target)) {
    if (current.length === 2 && target.length === 2) {
      const [x, y] = current;
      const [j, k] = target;
      if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
        if (j >= 0 && k >= 0 && j <= 7 && k <= 7) {
          return true;
        }
      }
    }
  }
  console.log('Please pass valid coordinates to the knightMoves function.');
}

function getAdjacentCoordinates(current) {
  let [x, y] = current.coordinate;
  let adjacencyList = [
    [x - 1, y - 2],
    [x - 2, y - 1],
    [x - 2, y + 1],
    [x - 1, y + 2],
    [x + 1, y + 2],
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x + 1, y - 2],
  ];
  adjacencyList = adjacencyList.filter((coordinate) => {
    const [x, y] = coordinate;
    if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
      return true;
    }
  });
  adjacencyList = adjacencyList.map((coordinate) => {
    return { coordinate, previousCoordinate: current };
  });
  return adjacencyList;
}

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