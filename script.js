"use strict";
//variables
const scores = [1, 2, 5, 10, 15, 20, "w"];
const randomScore = document.querySelector(".score");
const hitButton = document.querySelector(".hitButton");
const passButton = document.querySelector(".passButton");
const player1progressBar = document.querySelector(".player1Bar");
const player2progressBar = document.querySelector(".player2Bar");
const player1image = document.querySelector("#player1Image");
const player1Section = document.querySelector("#player1Section");
const player2image = document.querySelector("#player2Image");
const player2Section = document.querySelector("#player2Section");
const victoryScreen = document.querySelector(".victoryScreen");
const winnerImage = document.querySelector("#winnerPhoto");
const winnerName = document.querySelector("#winnerName");
const resetButton = document.querySelector("#resetButton");
const resetButtonGame = document.querySelector(".resetButtonClass");

var current_player = 1;
var player1score = 0;
var player2score = 0;

const plusPointMusic = new Audio("./sounds/IncreasePoint.wav");
const zeroPointMusic = new Audio("./sounds/PointZero.wav");
const changePlayerMusic = new Audio("./sounds/change.wav");
const cheerMusic = new Audio("./sounds/cheerVictory.wav");

//variables over

//functions

//function to check victory and show victory screen
function checkVictory() {
  if (player1score >= 100) {
    //set correct image and name
    winnerImage.src = player1image.src;
    winnerName.innerHTML = "SUPERMAN";
    //show victory screen
    victoryScreen.classList.remove("hideVicrotyScreen");
    cheerMusic.play();
    //play song
  }
  if (player2score >= 100) {
    //set correct image and name
    winnerImage.src = player2image.src;
    winnerName.innerHTML = "BATMAN";
    //show victory screen
    victoryScreen.classList.remove("hideVicrotyScreen");
    //play song
    cheerMusic.play();
  }
}

//function to reset
function resetGame() {
  //hide victoryScreen
  victoryScreen.classList.add("hideVicrotyScreen");
  //variables
  player1score = 0;
  player2score = 0;
  current_player = 1;
  //progressBar
  player1progressBar.innerHTML = `${player1score}%`;
  player1progressBar.style.height = `${(player1score / 100) * 70 + 10}%`;
  player2progressBar.innerHTML = `${player2score}%`;
  player2progressBar.style.height = `${(player2score / 100) * 70 + 10}%`;
  //Active_player
  player1Section.classList.add("active_player_section");
  player2Section.classList.remove("active_player_section");
  player1image.classList.add("active_player_image");
  player2image.classList.remove("active_player_image");
  player1progressBar.classList.add("active_player_bar");
  player2progressBar.classList.remove("active_player_bar");
  //random_value = ?
  randomScore.innerHTML = "?";
}

function playerSwitchMusic() {
  changePlayerMusic.play();
}

//increasing score and changing progress bar height
function increaseScore(value) {
  if (current_player === 1) {
    if (typeof value === "number") {
      plusPointMusic.play();
      player1score += value;
    } else {
      zeroPointMusic.play();
      player1score = 0;
      changePlayer();
    }
    player1progressBar.innerHTML = `${player1score}%`;
    player1progressBar.style.height = `${(player1score / 100) * 70 + 10}%`;
    console.log("p1: " + player1score);
  } else {
    if (typeof value === "number") {
      plusPointMusic.play();
      player2score += value;
    } else {
      zeroPointMusic.play();
      player2score = 0;
      changePlayer();
    }
    player2progressBar.innerHTML = `${player2score}%`;
    player2progressBar.style.height = `${(player2score / 100) * 70 + 10}%`;
    console.log("p2: " + player2score);
  }
}

//function to chnage the current player
function changePlayer() {
  if (current_player === 1) {
    current_player = 2;
    player2Section.classList.add("active_player_section");
    player1Section.classList.remove("active_player_section");
    player2image.classList.add("active_player_image");
    player1image.classList.remove("active_player_image");
    player2progressBar.classList.add("active_player_bar");
    player1progressBar.classList.remove("active_player_bar");
  } else {
    current_player = 1;
    player1Section.classList.add("active_player_section");
    player2Section.classList.remove("active_player_section");
    player1image.classList.add("active_player_image");
    player2image.classList.remove("active_player_image");
    player2progressBar.classList.remove("active_player_bar");
    player1progressBar.classList.add("active_player_bar");
  }
  console.log(`current_player: ${current_player}`);
}

/* adding random_value , increasing player score displaying on screen, checking victory  in hit button.
 */
hitButton.addEventListener("click", function () {
  let rand_value = scores[Math.floor(Math.random() * 7)];
  randomScore.innerHTML = rand_value;
  increaseScore(rand_value);
  checkVictory();
});

//add current player chnaging login in pass button
passButton.addEventListener("click", function () {
  playerSwitchMusic();
  changePlayer();
});

//add reset function o reset button
resetButton.addEventListener("click", resetGame);

//add reset function in between the game
resetButtonGame.addEventListener("click", resetGame);
