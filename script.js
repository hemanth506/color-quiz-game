const startBtn = document.getElementById("start-button");
const colorDiv = document.getElementsByClassName("color-div");
const landingContent = document.getElementById("landing-content");
const questionTab = document.getElementById("question-tab");
const scoreBoardTab = document.getElementById("scoreBoard-tab");
const submitButton = document.getElementById("submit-button");
const nextButton = document.getElementById("next-question");
const correctMessage = document.getElementById("correct");
const wrongMessage = document.getElementById("wrong");
const nextQuestion = document.getElementById("next-question");
const redSpan = document.getElementById("red");
const greenSpan = document.getElementById("green");
const blueSpan = document.getElementById("blue");
const loseNotify = document.getElementById("lose-notify");
const winNotify = document.getElementById("win-notify");
const musicButton = document.getElementById("music");
const backgroundMusicAudio = document.getElementById("backgroundMusic");
const scoreText = document.getElementById("scoreText");

const QUESTION_LIMIT = 15;
const results = {
  correct: 0,
  wrong: 0,
  total: QUESTION_LIMIT,
};

const toggleMusic = () => {
  console.log(
    "🚀 ~ file: script.js:29 ~ toggleMusic ~ backgroundMusicAudio.volume:",
    backgroundMusicAudio.volume
  );
  if (backgroundMusicAudio.volume === 1) {
    backgroundMusicAudio.volume = 0;
    musicButton.style.backgroundColor = "rgb(250, 100, 100)";
  } else {
    backgroundMusicAudio.volume = 1;
    musicButton.style.backgroundColor = "rgb(137, 250, 100)";
  }
};

const colorOptionIds = [
  ...document.querySelectorAll("#color-options > div"),
].map(({ id }) => id);
console.log(colorOptionIds);

const goToQuestionsTab = () => {
  console.log("Clicked");
  landingContent.style.display = "none";
  questionTab.style.display = "block";
};

const generateRandomNumber = (withInNumber) => {
  return Math.floor(Math.random() * withInNumber);
};

const disableButtonAndChangeState = (button) => {
  button.disabled = true;
  button.style.cursor = "not-allowed";
  button.style.backgroundColor = "rgb(229, 234, 238)";
};

const enableButtonAndChangeState = (button) => {
  button.disabled = false;
  button.style.cursor = "pointer";
  button.style.backgroundColor = "rgb(143, 156, 146)";
};

const goBackToOriginalState = () => {
  correctMessage.setAttribute("class", "decision-box");
  wrongMessage.setAttribute("class", "decision-box");
  disableButtonAndChangeState(submitButton);
  disableButtonAndChangeState(nextButton);
};

const getRGBNumbers = () => {
  let redVal = generateRandomNumber(255);
  let greenVal = generateRandomNumber(255);
  let blueVal = generateRandomNumber(255);
  return { redVal, greenVal, blueVal };
};

let colors = [];
let index = 0;
const generateColorsOptionDiv = (colorOptionIds) => {
  colorOptionIds.forEach((elementId) => {
    let currentDiv = document.getElementById(elementId);
    const curCol = getRGBNumbers();
    colors.push(curCol);
    currentDiv.style.backgroundColor = `rgb(${curCol.redVal}, ${curCol.greenVal}, ${curCol.blueVal})`;
    currentDiv.setAttribute(
      "value",
      `rgb(${curCol.redVal}, ${curCol.greenVal}, ${curCol.blueVal})`
    );
  });
};

let selectedDivColorValue = "";
let selectedDivElt = "";
let previousSelectedDivId = "";
const selectedDiv = (clicked_id) => {
  if (previousSelectedDivId !== "") {
    document.getElementById(previousSelectedDivId).innerHTML = "";
  }
  goBackToOriginalState();
  console.log("🚀 ~ file: selectedDiv ~ this.id:", clicked_id);
  selectedDivElt = document.getElementById(clicked_id);
  selectedDivColorValue = selectedDivElt.getAttribute("value");
  selectedDivElt.innerHTML = "✔";
  previousSelectedDivId = clicked_id;
  enableButtonAndChangeState(submitButton);
};

const validateResult = () => {
  colorOptionIds.forEach((elementID) => {
    let curDiv = document.getElementById(elementID);
    curDiv.style.pointerEvents = "none";
  });
  const { redVal, greenVal, blueVal } = colors[index];
  const questionColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
  console.log("🚀", selectedDivColorValue, questionColor);
  if (selectedDivColorValue === questionColor) {
    winNotify.play();
    correctMessage.setAttribute("class", "decision-box correct-ans");
    results.correct = results.correct + 1;
  } else {
    loseNotify.play();
    wrongMessage.setAttribute("class", "decision-box wrong-ans");
    results.wrong = results.wrong + 1;
  }
  enableButtonAndChangeState(nextButton);
};

const generateQuestion = () => {
  colors = [];
  colorOptionIds.forEach((elementID) => {
    let curDiv = document.getElementById(elementID);
    curDiv.style.pointerEvents = "auto";
  });
  goBackToOriginalState();
  generateColorsOptionDiv(colorOptionIds);
  selectedDivElt.innerHTML = "";
  console.log("🚀 colorOptionIds.forEach ~ colors:", colors);
  index = generateRandomNumber(6);
  console.log("🚀 ~ file: script.js:47 ~ generateQuestion ~ index:", index);
  const { redVal, greenVal, blueVal } = colors[index];
  redSpan.innerText = redVal;
  greenSpan.innerText = greenVal;
  blueSpan.innerText = blueVal;
  results.total = results.total - 1;
  console.log(
    "🚀 ~ file: script.js:144 ~ generateQuestion ~ results:",
    results
  );
};

const finalScoreBoard = () => {
  console.log("questions exhaused");
  console.log(results);
  questionTab.style.display = "none";
  scoreBoardTab.style.display = "block";
  const score = Math.floor((results.correct / QUESTION_LIMIT) * 100, 2);
  if (score >= 70) {
    console.log("🚀 ~ >= 70 :", score);
    scoreText.innerText = `🎉 Walla 🎉\n you have cleared the round by scoring ${score}% 👍🏼`;
  } else if (score >= 50) {
    console.log("🚀 ~ >= 50 :", score);
    scoreText.innerText = `🎉 Congrats 👍🏼\n you have cleared the round by scoring ${score}% \n but still practise is required.`;
  } else {
    console.log("🚀 ~ < 50 :", score);
    scoreText.innerText = `Sorry 😔\n you have not cleared the round ${score}% 👎🏼\n please try to attempt again!`;
  }
};

const generateNextQuestion = () => {
  if (results.total === 0) {
    finalScoreBoard();
  } else {
    generateQuestion();
  }
};

// Initial generate
generateQuestion();
backgroundMusicAudio.play();
