// Function to register a new user
function registerUser() {

    // Create a user object with input values
  let userObj = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    phone: document.getElementById("phone").value,
    age: parseInt(document.getElementById("age").value, 10),
    dateOfBirth: document.getElementById("dateOfBirth").value,
    genderSelect: document.getElementById("gender").value,
    highscore: 0
  };

  // Check if username or email is already taken
  if (localStorage[userObj.username] !== undefined) {

    document.getElementById("registrationForm").reset();
    document.getElementById("successMessage").style.display = "none";
    document.getElementById("existmessage").style.display = "block";
    return;
  } else {
    // Save user data to local storage and display success message
    console.log(userObj);
    localStorage.setItem(userObj.username, JSON.stringify(userObj));
    document.getElementById("registrationForm").reset();
    document.getElementById("existmessage").style.display = "none";
    document.getElementById("successMessage").style.display = "block";
  }
}

// local storage for table ,updates the local storage for the table
function updateHighScore(username, newScore) {
  var userObj = JSON.parse(localStorage.getItem(username));

   // Update high score if user exists
  if (userObj !== null) {
    userObj.highscore = Math.max(userObj.highscore || 0, newScore);
    localStorage.setItem(username, JSON.stringify(userObj));
  }
}

function loginUser() {
  var enteredUsername = document.getElementById("loginUsername").value;
  var enteredPassword = document.getElementById("loginPassword").value;

  // Retrieve user data from local storage
  userObj = JSON.parse(localStorage.getItem(enteredUsername)) 

  if (userObj !== null && userObj.password == enteredPassword) {
    sessionStorage.loggedin = enteredUsername;
    // Successful login, display success message
    document.getElementById("loginForm").reset();
    document.getElementById("successMessage").style.display = "block";
    document.getElementById("errorMessage").style.display = "none"; // Hide error message if previously displayed

    
  } else {
    // Invalid credentials, display error message
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("successMessage").style.display = "none"; // Hide success message if previously displayed

   
  }
  // Get the current logged-in username from session storage
  var currentUsername = sessionStorage.getItem("loggedin");
  // Get the actual score achieved in the game (replace this with the actual score)
  var actualScore = 
    // Update the high score for the logged-in user
  updateHighScore(currentUsername, actualScore);
  
}