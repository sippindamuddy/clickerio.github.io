// JavaScript code
const clickButton = document.getElementById("clickButton");
const scoreElement = document.getElementById("score");
const storeButtons = document.getElementsByClassName("buyButton");

let score = 0;
let multiplier = 1;
let autoMultiplier = 0;
let darkMode = false;
let introShown = false;
let rainbowEnabled = false;

function formatScore(score) {
  const suffixes = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion', 'Sextillion', 'Septillion', 'Octillion', 'Nonillion', 'Decillion', 'Undecillion', 'Duodecillion', 'Tredecillion', 'Quattuordecillion', 'Quindecillion', 'Sexdecillion', 'Septendecillion', 'Octodecillion', 'Novemdecillion', 'Vigintillion', 'Centillion'];

  const logScore = Math.floor(Math.log10(score));
  const suffixIndex = Math.floor(logScore / 3);

  if (suffixIndex >= suffixes.length) {
    return 'Infinity';
  }

  const suffix = suffixes[suffixIndex];
  const formattedScore = (score / Math.pow(10, suffixIndex * 3)).toFixed(2);

  return formattedScore + ' ' + suffix;
}

function updateScore() {
  scoreElement.innerText = `Score: ${formatScore(score)}`;
}

function buyMultiplier(e) {
  const price = parseInt(e.target.dataset.price);
  if (score >= price) {
    score -= price;
    multiplier *= 2;
    updateScore();
  }
}

function toggleClickButtonAnimation() {
  clickButton.classList.remove("buttonBounce");
  void clickButton.offsetWidth;
  clickButton.classList.add("buttonBounce");
}

function generateRandomMultiplier() {
  const random = Math.random();
  if (random < 0.1) {
    return 10;
  } else if (random < 0.3) {
    return 5;
  } else if (random < 0.6) {
    return 2;
  } else {
    return 1;
  }
}

function handleClick() {
  const randomMultiplier = generateRandomMultiplier();
  score += multiplier * randomMultiplier;
  updateScore();
  toggleClickButtonAnimation();
  playClickSound(); // Play the click sound

  if (score >= 1000000 && !rainbowEnabled) {
    clickButton.classList.add("rainbow-effect");
    rainbowEnabled = true;
  }
}

clickButton.addEventListener("click", handleClick);

for (let i = 0; i < storeButtons.length; i++) {
  storeButtons[i].addEventListener("click", buyMultiplier);
}

// Create an Audio object for the click sound effect
const clickSound = new Audio('click-sound.mp3');

// Function to play the click sound
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Initialize the score element
updateScore();
