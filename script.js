document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = Array.from({ length: 9 }, (_, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = index;
      cell.addEventListener("click", handleCellClick);
      board.appendChild(cell);
      return cell;
    });
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", resetGame);
  
    let currentPlayer = "X";
    let gameActive = true;
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    function handleCellClick(event) {
      const cell = event.target;
      const index = parseInt(cell.dataset.index);
  
      if (cells[index].innerText || !gameActive) return;
  
      cells[index].innerText = currentPlayer;
      if (checkWin()) {
        endGame(false);
      } else if (checkDraw()) {
        endGame(true);
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  
    function checkWin() {
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return cells[index].innerText === currentPlayer;
        });
      });
    }
  
    function checkDraw() {
      return cells.every(cell => {
        return cell.innerText !== "";
      });
    }
  
    function endGame(draw) {
      gameActive = false;
      if (draw) {
        setMessage("It's a draw!");
        board.classList.add("draw");
      } else {
        setMessage(`Player ${currentPlayer} wins!`);
        board.classList.add("win");
      }
    }
  
    function setMessage(message) {
      const messageElement = document.getElementById("message");
      messageElement.innerText = message;
    }
  
    function resetGame() {
      currentPlayer = "X";
      gameActive = true;
      setMessage("");
      board.classList.remove("win", "draw");
      cells.forEach(cell => {
        cell.innerText = "";
      });
    }
  });
  