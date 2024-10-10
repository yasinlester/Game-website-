//initial variables
const paddleSpeed =5;
let ballSpeed = 5; // Initial ball speed
const winningScore = 11;

//list of constantants within the game
const gameContainer = document.querySelector('.game-container');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const ball = document.getElementById('ball');
const halfwayLine = document.getElementById('halfway-line');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('game-over');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// Initial positions and speeds
let player1Y = 150;
let player2Y = 150;
let ballX = 300;
let ballY = 200;
let ballSpeedX = ballSpeed;
let ballSpeedY = ballSpeed;

//scores
let player1Score = 0;
let player2Score = 0;

// Game state variables
let gameRunning = false;
let roundNumber = 1; // Initialize the round number

// Function to update game state
function update() {
    // Move paddles and ball
    if (gameRunning) {
      player1Y += (mouseY - player1Y) * 0.12;
      player2Y += ((ballY - 50) - player2Y) * 0.1;
  
      ballX += ballSpeedX;
      ballY += ballSpeedY;
  
      // Bounce off top and bottom walls
      if (ballY < 0 || ballY > 400) {
        ballSpeedY = -ballSpeedY;
      }
  
       // Collision with paddles
      if (
        (ballX < 30 && ballX > 20 && ballY > player1Y && ballY < player1Y + 100) ||
        (ballX > 570 && ballX < 580 && ballY > player2Y && ballY < player2Y + 100)
      ) {
        ballSpeedX = -ballSpeedX;
      }
  
        // Scoring and game over conditions
      if (ballX < 0 || ballX > 600) {
        if (ballX < 0) {
            player2Score++;
        } else {
            player1Score++;
        }
    
        if (player1Score >= winningScore || player2Score >= winningScore) {
            showGameOver(player1Score > player2Score ? 'Player 1' : 'Player 2');
            gameRunning = false;
            restartBtn.style.display = 'block';
    
            // Save Player 1 score to the highscore property in the local storage for the logged-in user
            var currentUsername = sessionStorage.getItem("loggedin");
            // Save Player 1 score to the highscore property in the local storage for the logged-in user
            if (currentUsername) {
                var userObj = JSON.parse(localStorage.getItem(currentUsername)) || {};
                userObj.highscore = Math.max(userObj.highscore || 0, player1Score);
                localStorage.setItem(currentUsername, JSON.stringify(userObj));
            }
    
            resetBall(); // Reset ball speed when the game finishes
            return;
        }
    
        resetBall();
      }
  // Update score display

      var currentUsername = sessionStorage.getItem("loggedin");
      scoreDisplay.textContent = `${currentUsername ? currentUsername : 'Player 1'}: ${player1Score}  Player 2: ${player2Score}`;

    // Update paddle and ball positions
      player1.style.top = `${player1Y}px`;
      player2.style.top = `${player2Y}px`;
      ball.style.left = `${ballX}px`;
      ball.style.top = `${ballY}px`;
  
      
  // Continue the game loop
      requestAnimationFrame(update);
    }
  }

  // Reset ball position and speed for a new round
function resetBall() {
    ballX = 300;
    ballY = 200;
    ballSpeedX = ballSpeed;
    ballSpeedY = ballSpeed;

    // Increase ball speed for each new round
    ballSpeed += 0.5;

    // Update round number
    roundNumber++;


}
// Display game over message for player 1
function showGameOver(winner) {
    gameOverDisplay.textContent = `${winner} wins!`;
    gameOverDisplay.style.display = 'block';
}

// Start a new game
function startGame() {
    roundNumber = 1; // Reset the round number when starting a new game
    ballSpeed = 5; // Reset the ball speed to the initial speed
    gameRunning = true;
    startBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    gameOverDisplay.style.display = 'none';
    player1Score = 0;
    player2Score = 0;
    update();
}

// Restart the game
function restartGame() {
    player1Score = 0;
    player2Score = 0;
    ballSpeed = 5; // Reset the ball speed to the initial speed when restarting the game
    resetBall();
    gameRunning = true;
    restartBtn.style.display = 'none';
    gameOverDisplay.style.display = 'none';
    update();
}

// Display game over message for player 2
function showGameOver(winner) {
    var currentUsername = sessionStorage.getItem("loggedin");
    var displayWinner = winner === 'Player 1' ? currentUsername : 'Player 2';
    gameOverDisplay.textContent = `${displayWinner} wins!`;
    gameOverDisplay.style.display = 'block';
}

// Function to update high score for a user
function updateHighScore(username, newScore) {
    var userObj = JSON.parse(localStorage.getItem(username));
  
    if (userObj !== null) {
      userObj.highscore = Math.max(userObj.highscore || 0, newScore);
      localStorage.setItem(username, JSON.stringify(userObj));
    }
  }

// Update mouseY variable based on mouse movement

let mouseY = 200;

gameContainer.addEventListener('mousemove', (e) => {
    if (player1) {
        mouseY = e.clientY - gameContainer.getBoundingClientRect().top - player1.clientHeight / 2;
    }
});


// Event listeners for buttons
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);