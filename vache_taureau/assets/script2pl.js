var num1 = 0,
  num2 = 0;

const pl1save = () => {
  num1 = document.getElementById("nbr1").value;
  document.getElementById("player1").style.display = "none";
  document.getElementById("player2").style.display = "block";
};
const pl2save = () => {
  num2 = document.getElementById("nbr2").value;
  document.getElementById("player2").style.display = "none";
  document.getElementById("init").style.display = "none";
  document.getElementsByClassName("game")[0].style.display = "block";
};

const choose = () => {
  let selectedRadioButton = document.querySelector(
    'input[name="option"]:checked'
  );
  num2 = document.getElementById("nbr2").value;
  let elementsWithEnterClass = document.getElementsByClassName("enter");

  for (let i = 0; i < elementsWithEnterClass.length; i++) {
    elementsWithEnterClass[i].innerHTML = selectedRadioButton.value;
  }
};

var attempts1 = 0;
var attempts2 = 0;
var actturn = "player1";
function checkGuess(attempts, nbr, guess, turn, msg, atmp) {
  if (turn == actturn) {
    attempts++;
    nbr = nbr.value;
    let selectedRadioButton = document.querySelector(
      'input[name="option"]:checked'
    );
    let val = document.getElementById(guess).value;
    document.getElementById(guess).value = "";
    let vache = 0;
    let taureau = 0;
    if (!val.length) alert("Enter a number!");
    for (let i = 0; i < parseInt(selectedRadioButton.value); i++) {
      for (let j = 0; j < parseInt(selectedRadioButton.value); j++) {
        if (nbr.charAt(i) === val.charAt(j)) {
          if (i === j) {
            taureau++;
          } else {
            vache++;
          }
        }
      }
    }
    if (nbr === val) {
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
        var newPosition = getRandomPositionWithinContainer(
          container,
          imageSize
        );
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
      msg
    ).innerHTML += `${val} ${vache}V ${taureau}T <br>`;
    document.getElementById(atmp).innerHTML = `Attempts: ${attempts}`;
    if (actturn == "player1") {
      actturn = "player2";
    } else {
      actturn = "player1";
    }
  } else {
    alert("not your turn");
  }
}
