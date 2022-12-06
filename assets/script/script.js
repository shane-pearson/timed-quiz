// Creating all the starting varibles. 
var start = document.querySelector("#start");
var timer = document.querySelector("#timer");
var quiz = document.querySelector("#quiz");
var question = document.querySelector("#question");
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");
var startTimer = 60;
var correct = 0;
var incorrect = 0;
var currentIndex = 0;

// Creating the questions in their own variable. Make the choices and array. 
var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings ", "booleans ", "alerts ", "numbers "],
      answer: 'choice3'
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
      answer: 'choice3'
    },
    {
        title: "Array in javascript can be used to store ",
        choices: ["numbers/strings", "other arrays", "booleans", "all of the above"],
        answer: 'choice4'
      }
  ];

// A function to start the timer. Then add time text plus the timer countdown. 
function setTime() {
    var timerInterval = setInterval(function() {
      startTimer--;
      timer.textContent = "Time: " + startTimer;
  
      if(startTimer === 0 || currentIndex === questions.length) {
        clearInterval(timerInterval);
        timer.textContent = "";
        alert("finish");
        results();
      }
  
    }, 1000);
  }


function displayQuestions() {
    for (var i = 0; i < questions.length; i++) {
        var c = questions[currentIndex].choices;
        var q = questions[currentIndex].title;
        choice1.innerHTML = c[0];
        choice2.innerHTML = c[1];
        choice3.innerHTML = c[2];
        choice4.innerHTML = c[3];
        question.innerHTML = q;
    }
   
}  

// A function to check wether the answer is true or false and notify you which one it was. 
// I need to work more to figure out how to make the alert show up and text. 
function checkAnswer(answer) {
    if (questions[currentIndex].answer == answer) {
        alert("correct");
        correct++;
        nextQuestion();
    }
    else {
        alert("incorrect");
        incorrect++;
        startTimer= startTimer - 8;
        nextQuestion();
    }
}

function nextQuestion(){
    currentIndex++;
    displayQuestions();
    
}

function results(){
    var score = parseInt(correct) + parseInt(startTimer);
    question.innerHTML = "score: " + score;
    quiz.innerHTML = "correct: " + correct + " " + "incorrect: " + incorrect;
    quiz.style.fontSize = "20px";
    quiz.style.color = "sienna";
    var save = document.createElement("button");
    save.innerHTML = "type your name and click to save";
    quiz.append(save);
    var input = document.createElement("input");
    input.style.margin = "10px";
    quiz.append(input);
    save.addEventListener("click", function (event) {
      event.preventDefault();
      var highscore = JSON.parse(localStorage.getItem('highscore')) || [];
      var userScore = {name: input.value, score: score };
      highscore.length <= 5 && highscore.push(userScore);
     if (highscore.length >= 5){
       for (let i = 0; i < highscore.length; i++){
        if (highscore[i].score < userScore.score){
          highscore.splice(i, 1, userScore);
          break;
        }
      }
     }
    //  Stringify to put results in an array. 
      localStorage.setItem('highscore', JSON.stringify(highscore));
      highscore.map(i => {
        if (highscore.length > 5){
              highscore.splice(5);
        }
        var li = document.createElement("li");
        li.innerHTML = i.name + " " + i.score;
        return quiz.append(li);
      }) 
      input.style.visibility = "hidden";
      save.style.visibility = "hidden";
      timer.innerHTML = "Score Board";

    });
}



// Creating the event listner to activeate on the click. The set time and display question functions go on the click, and then remove
// the start button from the screen. 
start.addEventListener("click", function () {    
setTime();
displayQuestions();
start.style.display = "none";
})