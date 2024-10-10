
// Define rankingTable after the element has been declared in the HTML
var rankingTable = document.getElementById("RankingTable");
var leaderboardHTML = "";
var userArray = [];

// Retrieve user data from local storage and populate userArray
var userData1 = JSON.parse(localStorage.getItem("user_user1"));
var userData2 = JSON.parse(localStorage.getItem("user_user2"));

if (userData1) userArray.push(userData1);
if (userData2) userArray.push(userData2);

    // Iterate through each user to populate the leaderboard
    for (let user of userArray) {
      if (user && user.username && user.password) {
        if ("highscore" in user && user.highscore !== null) {
          const highScore = user.highscore || 0;
  
          const userElement = document.createElement("div");
          userElement.classList.add("column");
          userElement.innerHTML = `<div class='cell'><b class='score'>${user.username}</b></div><div class='cell'><b class='score' id='user-score'>${highScore}</b></div>`;
  
          rankingTable.appendChild(userElement);
        }
      }
    }