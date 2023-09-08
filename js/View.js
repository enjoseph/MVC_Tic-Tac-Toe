export default class View {
  constructor() {
    // Get DOM elements
    this.scoreRestartBTN = document.getElementById("scoreRestartGame");
    this.tiles = document.querySelectorAll(".tile");
    this.restartBTN = document.getElementById("restartGame");

    // Initialize modal elements and event listener
    this.closeModalBTN = document.getElementById("Continue");
    this.closeModalBTN.addEventListener("click", () => {
      this.closeModal();
    });

    // Get the element for displaying the winning player
    this.winPlayer = document.getElementById("winPlayer");
  }

  // Set the winning player UI
  winPlayerSetUI(callBack) {
    this.winPlayer.innerHTML = callBack;
  }

  // Add event listener for score restart button
  onResScoreClick(callback) {
    this.scoreRestartBTN.addEventListener("click", () => {
      // alert("The game has been restarted");
      callback();
    });
  }

  // Add event listener for regular restart button
  onRestartClick(callBack) {
    this.restartBTN.addEventListener("click", () => {
      // alert("The game has been restarted");
      callBack();
    });
  }

  // Add event listeners for tiles
  onTileClick(callback) {
    this.tiles.forEach((tile) => {
      tile.addEventListener("click", () => {
        callback(tile);
      });
    });
  }

  // Update the UI based on the game board
  getBoardToUI(board) {
    board.forEach((value, i) => {
      document.querySelector(`.tile[data-i="${i}"]`).innerHTML = value;
    });
  }

  // Update the UI for the scores
  setScoreToUI(scoreX, scoreO) {
    document.getElementById("score-X").innerHTML = scoreX;
    document.getElementById("score-O").innerHTML = scoreO;
  }

  // Display the winner and show the modal
  displayWinner(callback) {
    document.querySelector('.winner').classList.add("view");
    this.winPlayerSetUI(callback);
  }

  // Close the winner modal
  closeModal() {
    document.querySelector('.winner').classList.remove("view");
  }

  // Display the draw modal
  displayDraw() {
    document.querySelector('.draw').classList.add("view");
    setTimeout(function() { 
    document.querySelector('.draw').classList.remove("view");
       
    }, 1000);
  }

  // Update the current player's turn
  currentPlayer(Player) {
    document.getElementById("turn").innerHTML = Player;
  }
}
