function selectCategorie(value) {
  switch (value) {
    case "computer":
      window.window.location.href = "vachetoreau_com.html";
      break;
    case "1player":
      window.window.location.href = "vachetoreau.html";
      break;
    case "2players":
      window.window.location.href = "vachetoreau_2players.html";
      break;
  }
}

const scores = JSON.parse(localStorage.getItem("vachedata")) || [];

const tbody = document.querySelector("#leaderboard tbody");

if (scores.length > 0) {
  scores.forEach((score) => {
    const row = tbody.insertRow();
    row.insertCell().textContent = score.name;
    row.insertCell().textContent = score.email;
    row.insertCell().textContent = score.attempts;
  });
} else {
  const noScoresRow = tbody.insertRow();
  noScoresRow.insertCell().colSpan = 3;
  noScoresRow.textContent = "No scores yet!";
}

const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", () => {
  document.getElementById("leaderboard").classList.add("closed");
});
const scoreboard = document.querySelector(".scoreboard");
scoreboard.addEventListener("click", () => {
  document.getElementById("leaderboard").classList.remove("closed");
});
