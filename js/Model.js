export default class Model {
  constructor() {
    // Initialize the game properties
    this.turn = "X";
    this.winnerCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.score = {
      X: 0,
      O: 0,
    };
    this.board = new Array(9).fill(null);
    this.winnerPlayer = null;
  }

  // Check for a winner or a draw
  checkWinner(playerDraw, players_Score, playerWin) {
    this.winnerCombination.forEach((combination) => {
      let [A, B, C] = combination;
      if (
        this.board[A] === "X" &&
        this.board[B] === "X" &&
        this.board[C] === "X"
      ) {
        this.winnerPlayer = "X";
        this.winner(playerWin);
      } else if (
        this.board[A] === "O" &&
        this.board[B] === "O" &&
        this.board[C] === "O"
      ) {
        this.winnerPlayer = "O";
        this.winner(playerWin);
      } else if (!this.board.includes(null) && !this.winnerPlayer) {
        this.checkDraw(playerDraw);
      }
    });
    players_Score();
  }

  // Handle a winner
  winner(playerWin) {
    if (this.winnerPlayer) {
      this.score[this.winnerPlayer] = this.score[this.winnerPlayer] + 1;
      playerWin();
      this.restartGame();
    }
  }

  // Restart the game
  restartGame() {
    this.turn = "X";
    this.board = new Array(9).fill(null);
  }

  // Check for a draw
  checkDraw(playerDraw) {
    if (!this.board.includes(null)) {
      playerDraw();
      this.restartGame();
    }
  }

  // Switch to the next player's turn
  nextTurn() {
    this.turn = this.turn === "X" ? "O" : "X";
  }

  // Make a move
  makeMove(element, playerDraw, players_Score, playerWin) {
    if (this.board[element.dataset.i] !== null) return;
    this.board[element.dataset.i] = this.turn;
    this.nextTurn();
    this.checkWinner(playerDraw, players_Score, playerWin);
  }
}
