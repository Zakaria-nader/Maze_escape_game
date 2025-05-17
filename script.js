const mazeContainer = document.getElementById("maze");
const statusText = document.getElementById("status");

// 0 = فراغ، 1 = جدار
const maze = [
  [0,1,0,0,0,0,1,0,0,0],
  [0,1,0,1,1,0,1,1,1,0],
  [0,0,0,1,0,0,0,0,1,0],
  [1,1,0,1,0,1,1,0,1,0],
  [0,0,0,0,0,1,0,0,1,0],
  [0,1,1,1,0,1,0,1,1,0],
  [0,1,0,1,0,0,0,0,0,0],
  [0,1,0,0,0,1,1,1,1,0],
  [0,1,1,1,0,0,0,0,1,0],
  [0,0,0,1,0,1,1,0,1,0],
];

const numRows = maze.length;
const numCols = maze[0].length;

let playerPos = { x: 0, y: 0 };
const goalPos = { x: 9, y: 9 };

function drawMaze() {
  mazeContainer.innerHTML = "";
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (maze[y][x] === 1) {
        cell.classList.add("wall");
      }

      if (x === goalPos.x && y === goalPos.y) {
        cell.classList.add("goal");
      }

      if (x === playerPos.x && y === playerPos.y) {
        cell.classList.add("player");
      }

      mazeContainer.appendChild(cell);
    }
  }
}

function movePlayer(dx, dy) {
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;

  if (
    newX >= 0 && newX < numCols &&
    newY >= 0 && newY < numRows &&
    maze[newY][newX] === 0
  ) {
    playerPos = { x: newX, y: newY };
    drawMaze();
    checkWin();
  }
}

function checkWin() {
  if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
    statusText.textContent = "مبروك! لقد وصلت إلى الهدف!";
    document.removeEventListener("keydown", handleKey);
  }
}

function handleKey(e) {
  switch (e.key) {
    case "ArrowUp": movePlayer(0, -1); break;
    case "ArrowDown": movePlayer(0, 1); break;
    case "ArrowLeft": movePlayer(-1, 0); break;
    case "ArrowRight": movePlayer(1, 0); break;
  }
}

document.addEventListener("keydown", handleKey);

drawMaze();