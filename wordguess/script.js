const itWords = [
  // Web Development
  "html",
  "css",
  "javascript",
  "react",
  "angular",
  "vue.js",
  "node.js",
  "express",
  "mongodb",
  "rest api",
  "bootstrap",
  "jquery",
  "ajax",
  "gulp",
  "webpack",
  "seo",
  // Programming Languages
  "python",
  "java",
  "c++",
  "c#",
  "php",
  "ruby",
  "swift",
  "kotlin",
  "go",
  "rust",

  // Databases
  "mysql",
  "postgresql",
  "sql server",
  "sqlite",
  "oracle",

  // Cloud Computing
  "aws",
  "azure",
  "google cloud platform",
  "digitalocean",

  // Networking
  "ip address",
  "dns",
  "firewall",
  "router",
  "switch",
  "vpn",

  // Cybersecurity
  "encryption",
  "authentication",
  "authorization",
  "malware",
  "phishing",
  "vulnerability",
  "penetration testing",

  // Artificial Intelligence
  "machine learning",
  "deep learning",
  "neural networks",
  "natural language processing",
  "computer vision",

  // Software Engineering
  "agile",
  "scrum",
  "kanban",
  "waterfall",
  "devops",
  "version control",
  "testing",

  // Hardware
  "cpu",
  "ram",
  "storage",
  "motherboard",
  "graphics card",
  "network card",

  // Other IT Terms
  "algorithm",
  "data structure",
  "bug",
  "debugging",
  "optimization",
  "scalability",
  "cloud computing",
  "iot",
  "big data",
  "mobile app development",
  "blockchain",
];

const fruitsAndVeggies = [
  "apple",
  "banana",
  "orange",
  "grape",
  "strawberry",
  "mango",
  "watermelon",
  "blueberry",
  "pineapple",
  "peach",
  "avocado",
  "cherry",
  "pear",
  "lemon",
  "lime",
  "kiwi",
  "cantaloupe",
  "raspberry",
  "blackberry",
  "grapefruit",
  "honeydew",
  "plum",
  "carrot",
  "potato",
  "tomato",
  "onion",
  "lettuce",
  "broccoli",
  "cucumber",
  "corn",
  "pepper",
  "spinach",
  "celery",
  "garlic",
  "green beans",
  "mushroom",
  "asparagus",
  "cauliflower",
  "beetroot",
  "zucchini",
  "eggplant",
  "peas",
  "artichoke",
];

var words = [];

const urlParams = new URLSearchParams(window.location.search);

const theme = urlParams.get("theme");

switch (theme) {
  case "it":
    words = itWords;
    break;
  case "fruits":
    words = fruitsAndVeggies;
    console.log(words);
    break;
  default:
}
const maxGuesses = 10;
let correctLetters = [];
let incorrectGuesses = 0;
let currentWord;
let messg = "";

function startGame() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  correctLetters = [];

  for (let i = 0; i < currentWord.length; i++) {
    correctLetters.push(currentWord[i] === " " ? " " : "_"); // Fill with spaces or underscores
  }

  incorrectGuesses = 0;
  updateGameDisplay();
}

function updateGameDisplay() {
  document.getElementById("word").textContent = correctLetters.join("\u00A0");
  document.getElementById(
    "guesses"
  ).textContent = `Incorrect guesses: ${incorrectGuesses}`;
}

function checkGuess(letter) {
  const matchingIndices = [];
  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === letter) {
      matchingIndices.push(i);
    }
  }

  if (matchingIndices.length > 0) {
    matchingIndices.forEach((index) => (correctLetters[index] = letter));
    if (!correctLetters.includes("_")) {
      document.getElementById("guesses").value = incorrectGuesses;
      messg = "You win! Number of incorrect guesses " + incorrectGuesses;
      document.getElementById("score").classList.add("open");
      document.getElementById("msg").innerHTML = messg;
    }
  } else {
    incorrectGuesses++;
    if (incorrectGuesses >= maxGuesses) {
      messg = "You lose! The word was " + currentWord;
      document.getElementById("guesses").value = incorrectGuesses;
      document.getElementById("score").classList.add("open");
      document.getElementById("msg").innerHTML = messg;
    }
  }

  updateGameDisplay();
}

document.getElementById("guessButton").addEventListener("click", () => {
  const letter = document.getElementById("letter").value.toLowerCase();
  if (letter.length === 1) {
    checkGuess(letter);
    document.getElementById("letter").value = "";
  } else {
    alert("Please enter a single letter.");
  }
});

document.getElementById("resetButton").addEventListener("click", startGame);

startGame();

const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior
  let storedData = localStorage.getItem("wordguessdata") || "[]";
  let allData = JSON.parse(storedData);
  // Access form data:
  const name = document.querySelector(".input1[name='name']").value;
  const email = document.querySelector(".input1[name='email']").value;
  const guesses = document.getElementById("guesses").value;
  const player = {
    name: name,
    email: email,
    guesses: guesses,
  };
  allData.push(player);
  localStorage.setItem("wordguessdata", JSON.stringify(allData));
  window.window.location.href = "wordguess.html";
}
