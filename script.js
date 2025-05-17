const maze = [
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 2],
  [1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [3, 1, 0, 1, 1, 1, 1, 0, 1, 0],
];

const mazeElement = document.getElementById("maze");
const statusElement = document.getElementById("status");
const stepsElement = document.getElementById("steps");
const winSound = document.getElementById("winSound");

let playerPosition = { x: 0, y: 9 };
let steps = 0;

function drawMaze() {
  mazeElement.innerHTML = "";
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (maze[y][x] === 1) cell.classList.add("wall");
      if (maze[y][x] === 2) cell.classList.add("end");
      if (maze[y][x] === 3) cell.classList.add("start");

      if (x === playerPosition.x && y === playerPosition.y) {
        cell.classList.add("player");
      }

      mazeElement.appendChild(cell);
    }
  }
  stepsElement.textContent = steps;
}

function movePlayer(dx, dy) {
  const newX = playerPosition.x + dx;
  const newY = playerPosition.y + dy;

  if (
    newX >= 0 &&
    newY >= 0 &&
    newX < maze[0].length &&
    newY < maze.length &&
    maze[newY][newX] !== 1
  ) {
    playerPosition = { x: newX, y: newY };
    steps++;
    drawMaze();
    checkWin();
  }
}

function checkWin() {
  if (maze[playerPosition.y][playerPosition.x] === 2) {
    statusElement.textContent = "تهانينا! وصلت إلى النهاية!";
    winSound.play();
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": movePlayer(0, -1); break;
    case "ArrowDown": movePlayer(0, 1); break;
    case "ArrowLeft": movePlayer(-1, 0); break;
    case "ArrowRight": movePlayer(1, 0); break;
  }
});

drawMaze();
window.movePlayer = movePlayer;
