let x, y, z;
let vtnbr = "";

const rand = () => {
  let selectedRadioButton = document.querySelector(
    'input[name="option"]:checked'
  );
  if (selectedRadioButton) {
    // Log the selected color to the console
    console.log(selectedRadioButton.value);
  } else {
    alert("Choose an option");
  }
  let myArray = [];
  myArray.push(Math.floor(Math.random() * 9 + 1));
  for (let i = 1; i < parseInt(selectedRadioButton.value); i++) {
    let a = Math.floor(Math.random() * 10);
    do {
      a = Math.floor(Math.random() * 10);
    } while (myArray.includes(a));

    myArray.push(a);
  }
  console.log(myArray.join(""));
  vtnbr = myArray.join("");
  document.getElementById("guessInput").value = "";
  document.getElementById("message").innerHTML = "";
  attempts = 0;
  document.getElementById("enter").innerHTML = selectedRadioButton.value;
};

let attempts = 0;

function checkGuess() {
  attempts++;
  let selectedRadioButton = document.querySelector(
    'input[name="option"]:checked'
  );
  let val = document.getElementById("guessInput").value;
  document.getElementById("guessInput").value = "";
  let vache = 0;
  let taureau = 0;
  if (!val.length) alert("Enter a number!");
  for (let i = 0; i < parseInt(selectedRadioButton.value); i++) {
    for (let j = 0; j < parseInt(selectedRadioButton.value); j++) {
      if (vtnbr.charAt(i) === val.charAt(j)) {
        if (i === j) {
          taureau++;
        } else {
          vache++;
        }
      }
    }
  }
  if (vtnbr === val) {
    document.getElementById("score").classList.add("open");
    document.getElementById(
      "msg"
    ).innerHTML = `You guessed ${vtnbr} in ${attempts} attemps`;
  }
  console.log(vache, taureau);
  document.getElementById(
    "message"
  ).innerHTML += `${val} ${vache}V ${taureau}T <br>`;
  document.getElementById("attempts").innerHTML = `Attempts: ${attempts}`;
}

function Enter() {
  var inputField = document.getElementById("guessInput");

  inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkGuess();
    }
  });
}

document.addEventListener("DOMContentLoaded", Enter);

const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior
  let storedData = localStorage.getItem("vachedata") || "[]";
  let allData = JSON.parse(storedData);
  // Access form data:
  const name = document.querySelector(".input1[name='name']").value;
  const email = document.querySelector(".input1[name='email']").value;

  const player = {
    name: name,
    email: email,
    attempts: attempts,
  };
  allData.push(player);
  localStorage.setItem("vachedata", JSON.stringify(allData));
  window.window.location.href = "index.html";
}
