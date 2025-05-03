const squares = document.querySelectorAll('.square');
const statusText = document.getElementById('status');
const playAgainButton = document.getElementById('play-again');
let currentTurn = 'X';
let gameActive = true;

squares.forEach((square, index) => {
  square.addEventListener('click', () => handleClick(index));
});

function handleClick(index) {
  if (!gameActive) return;
  const square = squares[index];
  if (square.innerText !== '') return;

  square.innerText = currentTurn;
  if (checkForWin()) {
    statusText.textContent = `${currentTurn} Wins! 🎉`;
    gameActive = false;
    playAgainButton.style.display = 'inline-block';
    return;
  }

  if ([...squares].every(square => square.innerText !== '')) {
    statusText.textContent = `It's a Draw 😐`;
    gameActive = false;
    playAgainButton.style.display = 'inline-block';
    return;
  }

  currentTurn = currentTurn === 'X' ? 'O' : 'X';
  statusText.textContent = `${currentTurn}'s Turn`;
}

function checkForWin() {
  const winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (const [a, b, c] of winningCombinations) {
    if (
      squares[a].innerText &&
      squares[a].innerText === squares[b].innerText &&
      squares[a].innerText === squares[c].innerText
    ) {
      [a, b, c].forEach(index => squares[index].classList.add('winner'));
      return true;
    }
  }
  return false;
}

playAgainButton.addEventListener('click', () => {
  squares.forEach(square => {
    square.innerText = '';
    square.classList.remove('winner');
  });
  currentTurn = 'X';
  statusText.textContent = "X's Turn";
  playAgainButton.style.display = 'none';
  gameActive = true;
});