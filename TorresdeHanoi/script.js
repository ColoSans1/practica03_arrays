let towers = [[], [], []];
let numDiscs = 3;

function initialize() {
  // Limpia las torres y establece el número de discos
  numDiscs = parseInt(document.getElementById("numDiscs").value);
  towers = [[], [], []];
  for (let i = numDiscs; i >= 1; i--) {
    towers[0].push(i);
  }
  render();
}

function render() {
  // Limpia y dibuja las torres
  for (let i = 0; i < 3; i++) {
    const tower = document.getElementById(`tower${i + 1}`);
    tower.innerHTML = ""; // Vaciar torre
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
  // Colores para los discos
  const colors = ["red", "orange", "yellow", "green", "blue"];
  return colors[disc - 1];
}

function move(from, to) {
  // Verifica si el movimiento es válido
  if (towers[from].length === 0) {
    alert("No hay discos para mover en esta pila.");
    return;
  }
  const disc = towers[from][towers[from].length - 1];
  if (towers[to].length > 0 && towers[to][towers[to].length - 1] < disc) {
    alert("Movimiento inválido. No puedes colocar un disco más grande sobre uno más pequeño.");
    return;
  }
  // Realiza el movimiento
  towers[to].push(towers[from].pop());
  render();
}

function checkWin() {
  // Verifica si todos los discos están en la torre 3
  if (towers[2].length === numDiscs) {
    alert("¡Has ganado!");
  }
}

function solveHanoi(n, from, to, aux) {
  if (n === 0) return;
  solveHanoi(n - 1, from, aux, to);
  setTimeout(() => {
    move(from, to);
    solveHanoi(n - 1, aux, to, from);
  }, 500);
}

function solve() {
  // Resuelve automáticamente
  solveHanoi(numDiscs, 0, 2, 1);
}


