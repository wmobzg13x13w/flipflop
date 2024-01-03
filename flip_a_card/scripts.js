const cards = document.querySelectorAll(".memory-card");
let matchedPairs = 0;

let hasFlippedCard = false;
let lockBoard = true;
let firstCard, secondCard;

const startButton = document.getElementById("start");
const timerElement = document.getElementById("timer");

let startTime = 0;
let isRunning = false;

function startTimer() {
  startTime = Date.now();
  isRunning = true;

  updateTimer();
  unflipCards();
  resetBoard();
}

function updateTimer() {
  if (isRunning) {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;

    requestAnimationFrame(updateTimer);
  }
}

startButton.addEventListener("click", startTimer);

const urlParams = new URLSearchParams(window.location.search);

const theme = urlParams.get("theme");
console.log(theme);

if (theme == "fruits") {
  var images = [];
  const allImages = [
    "assets/lemon.svg",
    "assets/tomato.svg",
    "assets/apple.svg",

    "assets/pepper.svg",
    "assets/strawberry.svg",
    "assets/carrot.svg",
  ];
  for (const image of allImages) {
    images.push(image);
    images.push(image);
  }
  images.sort(() => Math.random() - 0.5);
  const cardFronts = document.querySelectorAll(".memory-card .front-face");
  console.log(cardFronts);

  for (let i = 0; i < cardFronts.length; i++) {
    cardFronts[i].src = images[i];
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let firstCardFrontFaceImage = firstCard.querySelector(".front-face");
  let secondCardFrontFaceImage = secondCard.querySelector(".front-face");

  let firstImagePath = firstCardFrontFaceImage.src.split("/").pop(); // Get the filename
  let secondImagePath = secondCardFrontFaceImage.src.split("/").pop();

  let isMatch = firstImagePath === secondImagePath;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchedPairs++;
  if (matchedPairs === cards.length / 2) {
    gameEnded(); // Call a function to handle game ending logic
  }
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

function gameEnded() {
  isRunning = false;
  document.getElementById("score").classList.add("open");
}

const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let storedData = localStorage.getItem("flipcarddata") || "[]";
  let formData = JSON.parse(storedData);

  const name = document.querySelector(".input1[name='name']").value;
  const email = document.querySelector(".input1[name='email']").value;
  const time = document.getElementById("timer").textContent;

  // Add validation for name and email here
  console.log({ name, email, time });
  formData.push({ name, email, time });
  localStorage.setItem("flipcarddata", JSON.stringify(formData));

  window.location.href = "flipcard.html";
}
