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
  document.getElementById("messagePL").innerHTML = "";
  document.getElementById("container1").style.display = "none";
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
    document.getElementById("container1").style.display = "block";
    document.getElementById("image1").style.display = "block";
    document.getElementById("image2").style.display = "block";
    function getRandomPositionWithinContainer(container, imageSize) {
      var containerRect = container.getBoundingClientRect();
      var x = Math.floor(Math.random() * (containerRect.width - 10));
      var y = Math.floor(Math.random() * (containerRect.height - 10));
      return { x: x, y: y };
    }

    function moveImageRandomlyWithinContainer(imageId, containerId) {
      var image = document.getElementById(imageId);
      var container = document.getElementById(containerId);
      var imageSize = { width: image.width, height: image.height };
      var newPosition = getRandomPositionWithinContainer(container, imageSize);
      image.style.left = newPosition.x + "px";
      image.style.top = newPosition.y + "px";
    }

    setInterval(function () {
      moveImageRandomlyWithinContainer("image1", "container");
      moveImageRandomlyWithinContainer("image2", "container");
    }, 500);
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
