const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊🏻',
    beats: 'scissors'
  },
  {
    name: 'paper',
    emoji: '✋🏻',
    beats: 'rock'
  },
  {
    name: 'scissors',
    emoji: '✌🏻',
    beats: 'paper'
  }
];

const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const my = document.getElementById("my");
const your = document.getElementById("your");

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(selection => selection.name === selectionName);
    makeSelection(selection);
  });
});

function makeSelection(selection) {
  const computerSelection = randomSelection();
  const yourWinner = isWinner(selection, computerSelection);
  const computerWinner = isWinner(computerSelection, selection);

  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, yourWinner);

  if (yourWinner) {
    incrementScore(yourScoreSpan);
    if (parseInt(yourScoreSpan.innerText) === 3) {
      setTimeout(function() {
        alert("Congratulations! You won the game!");
        resetGame();
      }, 1000)
    }
  }
  if (computerWinner) {
    incrementScore(computerScoreSpan);
    if (parseInt(computerScoreSpan.innerText) === 3) {
      setTimeout(function() {
        alert("Computer won the game. Better luck next time!");
        resetGame();
      }, 1000)
    }
  }
}

function resetGame() {
  yourScoreSpan.innerText = "0";
  computerScoreSpan.innerText = "0";
  finalColumn.nextSibling.remove(); // Remove result selections
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function addSelectionResult(selection, winner) {
  const div = document.createElement('div');
  div.innerText = selection.emoji;
  div.classList.add('result-selection');
  if (winner) div.classList.add('winner');
  finalColumn.after(div);
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}

