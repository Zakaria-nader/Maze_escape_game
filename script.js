const size = 50;
let maze = [];
let player = { x: 0, y: 0 };
let steps = 0;
const exit = { x: size - 1, y: size - 1 };

const mazeElement = document.getElementById("maze");
const stepsCount = document.getElementById("stepsCount");
const winSound = document.getElementById("winSound");
const restartBtn = document.getElementById("restartBtn");

// توليد متاهة بسيطة (أعمدة متقطعة وبعض الجدران العشوائية)
function generateMaze() {
  maze = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      if (Math.random() < 0.25 && !(x === 0 && y === 0) && !(x === exit.x && y === exit.y)) {
        row.push(1); // جدار
      } else {
        row.push(0); // مسار
      }
    }
    maze.push(row);
  }
  // تأكيد أن البداية والنهاية مفتوحتان
  maze[0][0] = 0;
  maze[exit.y][exit.x] = 0;
}

function drawMaze() {
  mazeElement.innerHTML = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (maze[y][x] === 1) cell.classList.add("wall");
      if (x === player.x && y === player.y) cell.classList.add("player");
      if (x === exit.x && y === exit.y) cell.classList.add("exit");
      mazeElement.appendChild(cell);
    }
  }
}

function move(dx, dy) {
  const nx = player.x + dx;
  const ny = player.y + dy;
  if (nx >= 0 && ny >= 0 && nx < size && ny < size && maze[ny][nx] === 0) {
    player.x = nx;
    player.y = ny;
    steps++;
    stepsCount.textContent = `الخطوات: ${steps}`;
    drawMaze();
    checkWin();
  }
}

function checkWin() {
  if (player.x === exit.x && player.y === exit.y) {
    winSound.play();
    restartBtn.style.display = "inline-block";
    alert("تهانينا! لقد وصلت إلى المخرج!");
  }
}

function restartGame() {
  player = { x: 0, y: 0 };
  steps = 0;
  stepsCount.textContent = "الخطوات: 0";
  restartBtn.style.display = "none";
  generateMaze();
  drawMaze();
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": move(0, -1); break;
    case "ArrowDown": move(0, 1); break;
    case "ArrowLeft": move(-1, 0); break;
    case "ArrowRight": move(1, 0); break;
  }
});

// بدء اللعبة
generateMaze();
drawMaze();
