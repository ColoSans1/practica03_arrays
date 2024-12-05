let towers = [[], [], []];
let numDiscs = 3;
let solving = false;

function initialize() {
  const inputDiscs = parseInt(document.getElementById("numDiscs").value);
  if (isNaN(inputDiscs) || inputDiscs < 1 || inputDiscs > 5) {
    alert("Por favor, selecciona un número de discos entre 1 y 5.");
    return;
  }

  numDiscs = inputDiscs;
  towers = [[], [], []];
  for (let i = numDiscs; i >= 1; i--) {
    towers[0].push(i);
  }
  solving = false;
  render();
}

function render() {
  for (let i = 0; i < 3; i++) {
    const tower = document.getElementById(`tower${i + 1}`);
    tower.innerHTML = ""; // Vaciar la torre
    towers[i].forEach((disc, index) => {
      const discDiv = document.createElement("div");
      discDiv.className = "disc";
      discDiv.style.width = `${disc * 30}px`;
      discDiv.style.bottom = `${index * 22}px`;
      discDiv.style.backgroundColor = getColor(disc);
      discDiv.innerText = disc;
      tower.appendChild(discDiv);
    });
  }
  checkWin();
}

function getColor(disc) {
  const colors = ["red", "orange", "yellow", "green", "blue"];
  return colors[(disc - 1) % colors.length];
}

function move(from, to) {
  if (towers[from].length === 0) return;
  const disc = towers[from][towers[from].length - 1];
  if (towers[to].length > 0 && towers[to][towers[to].length - 1] < disc) return;

  towers[to].push(towers[from].pop());
  render();
}

function checkWin() {
  if (towers[2].length === numDiscs) {
    alert("¡Felicidades, has ganado!");
    solving = false;
  }
}

function solveHanoi(n, from, to, aux) {
  const moves = [];
  function generateMoves(n, from, to, aux) {
    if (n > 0) {
      generateMoves(n - 1, from, aux, to);
      moves.push([from, to]);
      generateMoves(n - 1, aux, to, from);
    }
  }
  generateMoves(n, from, to, aux);
  return moves;
}

function solve() {
  if (solving) return;
  solving = true;
  const moves = solveHanoi(numDiscs, 0, 2, 1);
  executeMoves(moves);
}

function executeMoves(moves) {
  if (moves.length === 0) {
    solving = false;
    return;
  }
  const [from, to] = moves.shift();
  move(from, to);
  setTimeout(() => executeMoves(moves), 500); // Ajusta el tiempo entre movimientos
}
