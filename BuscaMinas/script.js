const boardSize = 8; // Tamaño del tablero (8x8)
const mineCount = 10; // Número total de minas
let board = []; // Tablero como array bidimensional
let revealedCells = 0; // Contador de celdas descubiertas
let gameOver = false;

// Función principal: inicia el juego
function startGame() {
  board = createEmptyBoard();
  placeMines();
  calculateNumbers();
  renderBoard();
  revealedCells = 0;
  gameOver = false;

  // Resetea el puntaje
  document.getElementById("score").textContent = "0";
}

// Crea un tablero vacío lleno de ceros
function createEmptyBoard() {
  const emptyBoard = [];
  for (let i = 0; i < boardSize; i++) {
    const row = new Array(boardSize).fill(0);
    emptyBoard.push(row);
  }
  return emptyBoard;
}

// Coloca minas aleatoriamente en el tablero
function placeMines() {
  let placedMines = 0;

  while (placedMines < mineCount) {
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);

    // Si no hay una mina, coloca una
    if (board[row][col] !== "💣") {
      board[row][col] = "💣";
      placedMines++;
    }
  }
}

// Calcula los números alrededor de las minas
function calculateNumbers() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === "💣") continue;

      let count = 0;

      // Recorre las celdas adyacentes
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const newRow = i + x;
          const newCol = j + y;

          if (
            newRow >= 0 &&
            newRow < boardSize &&
            newCol >= 0 &&
            newCol < boardSize &&
            board[newRow][newCol] === "💣"
          ) {
            count++;
          }
        }
      }

      board[i][j] = count; // Asigna el número calculado
    }
  }
}

// Renderiza el tablero en el DOM
function renderBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = ""; // Limpia el contenido actual

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      // Evento de clic para cada celda
      cell.addEventListener("click", () => handleCellClick(i, j));

      // Agrega la celda al DOM
      boardElement.appendChild(cell);
    }
  }
}

// Maneja el clic en una celda
function handleCellClick(row, col) {
  if (gameOver) return;

  const boardElement = document.getElementById("board");
  const cells = boardElement.children;
  const index = row * boardSize + col;

  if (cells[index].classList.contains("revealed")) return;

  cells[index].classList.add("revealed");

  if (board[row][col] === "💣") {
    cells[index].textContent = "💣";
    revealAllMines();
    alert("¡GAME OVER!");
    gameOver = true;
  } else {
    cells[index].textContent = board[row][col] || "";
    revealedCells++;

    // Actualiza el puntaje
    document.getElementById("score").textContent = revealedCells;

    // Si no hay minas alrededor, revela las celdas adyacentes
    if (board[row][col] === 0) {
      revealAdjacentCells(row, col);
    }

    // Verifica si se ha ganado
    if (revealedCells === boardSize * boardSize - mineCount) {
      alert("¡Has ganado!");
      gameOver = true;
    }
  }
}

// Revela todas las minas
function revealAllMines() {
  const boardElement = document.getElementById("board");
  const cells = boardElement.children;

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === "💣") {
        const index = i * boardSize + j;
        cells[index].classList.add("revealed");
        cells[index].textContent = "💣";
      }
    }
  }
}

// Revela las celdas adyacentes a una celda vacía
function revealAdjacentCells(row, col) {
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const newRow = row + x;
      const newCol = col + y;

      if (
        newRow >= 0 &&
        newRow < boardSize &&
        newCol >= 0 &&
        newCol < boardSize &&
        !document.getElementById("board").children[newRow * boardSize + newCol].classList.contains("revealed")
      ) {
        handleCellClick(newRow, newCol);
      }
    }
  }
}
