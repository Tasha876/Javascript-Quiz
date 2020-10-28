var questions = document.querySelectorAll(".question");

console.log(questions)

var questionCount = questions.length;

var atQuestion = 0;

var scramble = scrambleNums(questionCount);

console.log("scram " + scramble);

var finalScore = document.querySelector("#final-score");

for (var i = 0; i < questionCount; i++) {
  questions[i].classList.add("hide");
} 



finalScore.classList.add("hide");
console.log(finalScore.innerHTML);




var quiz = document.querySelector("#quiz");

var time = 120;
var timer = document.querySelector("#timer");

timer.innerHTML = "2:00";

nextQuestion();

var runClock = setInterval(clock, 1000);

function clock() {

  time--;

  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;

  timer.innerHTML = minutes + ":" +  ("00" + seconds).slice(-2);

	if (time <= 0) {
		endGame()
		clearInterval(runClock);
	} else if (time <= 15) {
		timer.classList.remove("near_end");
		timer.classList.add("almost_up");
	} else if  (time <= 30) {
		timer.classList.add("near_end");
	} 
}

function updateScore(e) {
	if (!e.target.classList.contains("correct")) {
		(time - 10 >= 0)? (time -= 9, clock()) : (time = 0, clock());
	}
}

function nextQuestion() {
  //console.log("count" + time)
  var curr = questions[scramble[atQuestion]];
  atQuestion++;
  if (atQuestion < questionCount && time) {
    var next = questions[scramble[atQuestion]];
    curr.classList.add("hide");
    console.log(questions[scramble[atQuestion - 1]])
    next.classList.remove("hide");
    console.log("Q", scramble[atQuestion]);
  } else {
    curr.classList.add("hide");
    endGame();
  } 
}

function endGame() {
  var scoreSpan = document.querySelector("#score");
  scoreSpan.innerText = time;
  finalScore.classList.remove("hide");
  console.log("final " + finalScore.innerHTML);
  clearInterval(runClock);
  //timer.classList.add("hide");
}

var possibleAnswers = document.querySelectorAll(".answers li");

for (let i = 0; i < possibleAnswers.length; i++) {
  possibleAnswers[i].addEventListener("click",updateScore);
  possibleAnswers[i].addEventListener("click",nextQuestion);
}

function scrambleNums(num){
  var scrambledList = [];
  var unscrambledList = []
  for (let i = 0; i < num; i++) {
    unscrambledList.push(i);
  }
  while(unscrambledList.length){
    var len = unscrambledList.length;
    item = unscrambledList[Math.floor(Math.random() * len)];
    scrambledList.push(item);
    unscrambledList.splice(unscrambledList.indexOf(item), 1);
   }
  return scrambledList;
}

// var textArea = document.querySelector("form textarea");
// var initials = document.querySelector("#initials");
// console.log(initials.value)
// var submit = document.querySelector("#submit");
// console.log(submit.innerText)


// function addInitials(e){
//   e.preventDefault();
//   if (initials) {
//     textArea.value += time + ":" + initials.value + "\n";
//     submit.disabled = true;
//   }
// }

// submit.addEventListener("submit", function(e) { addInitials(e)} );

var textArea = document.querySelector("form textarea");
var initials = document.querySelector("#initials");
console.log(initials.value);
var highscorers = [];

function addInitials(e){
  e.preventDefault();
  if (initials) {
    highscorers.push(initials);
    sessionStorage.setItem(highscores, JSON.stringify(highscorers));
    textArea.value += time + ":" + initials.value + "\n";
  } 
  var submitBtn = document.querySelector("#submit") 
  submitBtn.disabled = true;
  console.log(submit.disabled)
  return true;
}
var form = document.querySelector("form")

form.addEventListener("submit", function(e) { addInitials(e)});
console.log(scrambleNums(9));
