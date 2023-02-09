//grab all the buttons and loop through the button and attach the event
//on button click, get the text inside the button
//global variables to hold all the clicked data
//use the same variables to show data in the display using innertext

const allBtns = document.querySelectorAll(".btn");

const btnArgs = Array.from(allBtns);

const displayElm = document.querySelector(".display");

let strToDisplay = "";

const operator = ["+", "-", "*", "/"];

let lastOperator = "";

// let allowDot = true;

// const audio = new Audio("audio.wav");

btnArgs.map((item, i) => {
  item.addEventListener("click", () => {
    displayElm.style.background = "";
    displayElm.style.color = "black";
    displayElm.classList.remove("prank");

    const val = item.innerText;

    if (val === "AC") {
      strToDisplay = "";
      display(strToDisplay);
      return;
    }
    if (val === "C") {
      if (strToDisplay.length) {
        strToDisplay = strToDisplay.slice(0, -1);
        display(strToDisplay);
      }
      return;
    }
    if (val === "=") {
      const lastChar = strToDisplay[strToDisplay.length - 1];
      if (operator.includes(lastChar)) {
        //remove last char
        strToDisplay = strToDisplay.slice(0, -1);
      }
      total();
      return;
    }

    if (operator.includes(val)) {
      if (!strToDisplay) {
        return;
      }
      lastOperator = val;

      //   allowDot = true;
      const lastChar = strToDisplay[strToDisplay.length - 1];
      if (operator.includes(lastChar)) {
        //remove last char
        strToDisplay = strToDisplay.slice(0, -1);
      }
    }

    // if (val === ".") {
    //   if (!allowDot) {
    //     return;
    //   }
    //   allowDot = false;
    // }

    // if (val === "." && !allowDot) strToDisplay += val;

    if (val === ".") {
      if (lastOperator) {
        const operatorIndex = strToDisplay.lastIndexOf(lastOperator);

        const lastNumberSet = strToDisplay.slice(operatorIndex + 1);

        if (!lastNumberSet.includes(".")) {
          return;
        }
      }

      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
    }
    strToDisplay += val;

    display(strToDisplay);
  });
});

const display = (str) => {
  displayElm.innerHTML = str || "0.00";
};

const total = () => {
  const extra = randomNumber();
  console.log(extra);
  if (extra) {
    displayElm.style.background = "red";
    displayElm.style.color = "white";

    displayElm.classList.add("prank");
    // audio.play();
  }
  const ttl = eval(strToDisplay) + extra;
  strToDisplay = ttl;

  display(strToDisplay);
};

const randomNumber = () => {
  const num = Math.round(Math.random() * 10);
  return num <= 4 ? num : 0;
};
