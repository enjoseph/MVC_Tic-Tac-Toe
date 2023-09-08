export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    // Initialize event listeners
    this.view.onTileClick(this.helperMove.bind(this));
    this.view.onResScoreClick(this.helperRestartScore.bind(this));
    this.view.onRestartClick(this.helperRestartGameBoard.bind(this));
  }

  // Handle a tile click event
  helperMove(tile) {
    // Make a move using the model
    this.model.makeMove(
      tile,
      this.helperDraw.bind(this),
      this.helperScore.bind(this),
      this.helperWinner.bind(this)
    );

    // Update the UI
    this.view.getBoardToUI(this.model.board);
    this.helperScore();
    this.view.currentPlayer(this.model.turn);
  }

  // Update and display the score
  helperScore() {
    const { X, O } = this.model.score;
    this.view.setScoreToUI(X, O);
    this.model.winnerPlayer = null; // Reset the winnerPlayer
  }

  // Display a draw message
  helperDraw() {
    this.view.displayDraw();
  }

  // Handle a request to restart the game board
  helperRestartGameBoard() {
    // Restart the game in the model and update the UI
    this.model.restartGame();
    this.view.getBoardToUI(this.model.board);
  }

  // Handle a request to restart the score
  helperRestartScore() {
    // Reset the score and game state in the model, and update the UI
    this.model.score = {
      X: 0,
      O: 0,
    };
    this.model.restartGame();
    this.view.setScoreToUI(this.model.score.X, this.model.score.O);
    this.view.getBoardToUI(this.model.board);
  }

  // Display the winner
  helperWinner() {
    this.view.displayWinner(this.model.winnerPlayer);
  }
}
