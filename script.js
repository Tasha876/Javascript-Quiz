var questions = document.querySelectorAll(".question");
var questionCount = questions.length;
var atQuestion = 0;
var scramble = scrambleNums(questionCount);

var finalScore = document.querySelector("#final-score");
var hasHighscore = document.querySelector("#hasHighscore")
var submittedHS = false;

var quiz = document.querySelector("#quiz");
var possibleAnswers = document.querySelectorAll(".answers li");

var time = 120;
var timer = document.querySelector("#timer");
var runClock = setInterval(clock, 1000);

var form = document.querySelector("form");
var submitBtn = document.querySelector("#submit"); 
var highscoreList = document.querySelector("#final-score ol");
var initials = document.querySelector("#initials");
var highscores = [];

function hideQuestions(){
  for (var i = 0; i < questionCount; i++) {
    index = scramble[i]
    questions[index].classList.add("hide");
  } 
}

function clock() {

  if (time) time--;

  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;

  timer.innerHTML = minutes + ":" +  ("00" + seconds).slice(-2);

	if (time <= 0) {
    time = 0;
		endGame();
	} else if (time <= 15) {
		timer.classList.remove("near_end");
		timer.classList.add("almost_up");
	} else if  (time <= 30) {
		timer.classList.add("near_end");
	} 
}

function updateScore(e) {
  e.target.classList.add("active");
	if (!e.target.classList.contains("correct")) {
    (time - 15 >= 0)? (time -= 15, clock()) : (time = 0, clock());
	}
}

function nextQuestion() {
  var curr = questions[scramble[atQuestion]];
  atQuestion++;
  if (atQuestion < questionCount && time) {
    var next = questions[scramble[atQuestion]];
    curr.classList.add("hide");
    next.classList.remove("hide");
  } else {
    curr.classList.add("hide");
    endGame();
  } 
}

function endGame() {
  hideQuestions();
  timer.classList.add("stop_blinking");
  var scoreSpan = document.querySelector("#score");
  scoreSpan.innerText = time;
  finalScore.classList.remove("hide");
  clearInterval(runClock);
  init();
}

for (let i = 0; i < possibleAnswers.length; i++) {
  possibleAnswers[i].addEventListener("mousedown",updateScore);
  possibleAnswers[i].addEventListener("click",nextQuestion);
}

function scrambleNums(num) {
  var scrambledList = [];
  var unscrambledList = []
  for (let i = 0; i < num; i++) {
    unscrambledList.push(i);
  }
  while (unscrambledList.length){
    var len = unscrambledList.length;
    item = unscrambledList[Math.floor(Math.random() * len)];
    scrambledList.push(item);
    unscrambledList.splice(unscrambledList.indexOf(item), 1);
   }
  return scrambledList;
}

function init() {
  var storedHighscores = JSON.parse(localStorage.getItem("highscores"));

  if (storedHighscores) {
    highscores = storedHighscores;
  }
  renderHighscores();

  if (time <= 0 || (time < highscores[9] && time < highscores[9][0])) {
    hasHighscore.innerText = "Better luck next time."
  }
}

function storeHighscores() {
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

function renderHighscores() {

  highscoreList.innerText = "";

  for (var i = 0; i < 10; i++) {
    var li = document.createElement("li");
    (highscores[i])? li.innerHTML = "<span class = tab>" + highscores[i][1] + "</span>" + "<span class = 'tab alignRight'>" + highscores[i][0] + "</span>" : li.innerHTML = "";
    highscoreList.appendChild(li);
  }
}

function addInitials() {
  if (initials.value) {
    highscores.push([parseInt(time), initials.value]);
    // not sure why I had to do this for the array to sort properly, but it works now :)
    highscores.sort(([a, b], [c, d]) => c - a || b - d);
    initials.value = "";
  } 

  storeHighscores();
  renderHighscores();

  submitBtn.disabled = true;

  return true;
}

hideQuestions();

questions[scramble[0]].classList.remove("hide");

finalScore.classList.add("hide");

timer.innerHTML = "2:00";

form.addEventListener("submit", function(e) {
  e.preventDefault(); 
  addInitials()
  submittedHS = true;
});

initials.addEventListener("keyup", function(){
  if (initials.value.length && !submittedHS) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
    
  } return true;
  
});