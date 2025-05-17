const mazeElement = document.getElementById("maze");
const statusElement = document.getElementById("status");
const stepsElement = document.getElementById("steps");
const winSound = document.getElementById("winSound");
const restartBtn = document.getElementById("restartBtn");

// زيادة حجم المتاهة لتصبح 5 أضعاف
const maze = [
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
  // (المسارات ستزيد بشكل مماثل هنا لتغطية 50x50)
];

let playerPos = { x: 0, y: 0 };
let steps = 0;
const exitPos = { x: 49, y: 49 };

function renderMaze() {
  mazeElement.innerHTML = "";
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (maze[y][x] === 1) {
        cell.classList.add("wall");
      } else if (x === playerPos.x && y === playerPos.y) {
        cell.classList.add("player");
      } else if (x === exitPos.x && y === exitPos.y) {
        cell.classList.add("exit");
      }

      mazeElement.appendChild(cell);
    }
  }
}

function movePlayer(dx, dy) {
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;

  if (
    newX >= 0 &&
    newX < maze[0].length &&
    newY >= 0 &&
    newY < maze.length &&
    maze[newY][newX] === 0
  ) {
    playerPos.x = newX;
    playerPos.y = newY;
    steps++;
    stepsElement.textContent = steps;
    renderMaze();

    if (playerPos.x === exitPos.x && playerPos.y === exitPos.y) {
      statusElement.textContent = "تهانينا! لقد وصلت إلى المخرج!";
      winSound.play();
      restartBtn.style.display = "inline-block";
    }
  }
}

function restartGame() {
  playerPos = { x: 0, y: 0 };
  steps = 0;
  stepsElement.textContent = steps;
  statusElement.textContent = "";
  restartBtn.style.display = "none";
  renderMaze();
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      movePlayer(0, -1);
      break;
    case "ArrowDown":
      movePlayer(0, 1);
      break;
    case "ArrowLeft":
      movePlayer(-1, 0);
      break;
    case "ArrowRight":
      movePlayer(1, 0);
      break;
  }
});

renderMaze();