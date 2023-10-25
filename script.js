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

function levelOrder(current, target) {
  const queue = [{ coordinate: current, previousCoordinate: null }];
  const [xVal, yVal] = target;
  while (queue.length > 0) {
    let current = queue.shift();
    const [x, y] = current.coordinate;
    if (x === xVal && y === yVal) {
      const array = [];
      while (current) {
        array.unshift(current.coordinate);
        current = current.previousCoordinate;
      }
      return array;
    } else {
      const adjacencyList = getAdjacentCoordinates(current);
      adjacencyList.forEach((coordinate) => queue.push(coordinate));
    }
  }
}

function printPath(path) {
  let string = `You made it in ${path.length - 1} ${
    path.length === 2 ? 'move' : 'moves'
  }! Here's your path:\n`;
  path.forEach((coordinate) => (string += `[${coordinate}]\n`));
  console.log(string);
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

function knightMoves(current, target) {
  const validInput = checkValidity(current, target);
  if (validInput) {
    const path = levelOrder(current, target);
    printBoard(path);
    printPath(path);
  }
}


// Print a blank chessboard;
printBoard();
console.log(
  'Call the knightMoves function to determine the shortest path between two squares on the board.\nExample: knightMoves([0,0], [7,7])',
);

// Test the knightMoves function;
knightMoves([0, 0], [7, 7]);

/* You made it in 6 moves! Here's your path:
   [0,0]
   [1,2]
   [0,4]
   [1,6]
   [3,7]
   [5,6]
   [7,7] 
*/