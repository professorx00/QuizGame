$(document).ready(function(){
    $('select').formSelect();
  });


const docQuestion = $("#question");
const docChoices = $(".choice-text");
const docScore = $(".scoreDisplay");
const docQuestionText = $("#hudQuestionNumber");
const docProgressBarFullFill = $("#progressBarFull");
const docHighSore = $("#highscore");
const docInput = $("#username");
const docHighScoreContainer = $("#highScoreContainer");
const docHighScoreList = $("#highscorelist");
const docCat = $("#Categories");
const docLevel = $("#level");
const docBtnChoose = $("#btnChoose");
const docTimer = $("#timerText");


let APIURL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
let NumberofQuestions = 10;
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = []
let questions = [];
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
let choices = [];
let counterUsers = 0;
let highScoresArray = []
let highScores = {};
let response;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
}
GameOver = () => {
    clearTimeout(Tout)
    finalScore();
    $("div.titleScreen").hide();
    $("div.game").hide();
    $("div.gameOver").show().addClass("zoomIn");
}
Timer = function (time) {
    time--;
}
let CountdownRunning= false;
getNewQuestion = () => {
    timeCounter = 30
    count = 3000
    const myFunction = () => {
        count--
        docTimer.text(count)
        tcounter = setTimeout(myFunction, 1000)
        CountdownRunning = true;
        if(count<=0){
            clearTimeout(tcounter)
            clearTimeout(Tout)
            GameOver()
        }
        
    }
    if(!CountdownRunning){
        Tout = setTimeout(myFunction(), 1000)
    }
    else{
        clearTimeout(Tout);
    }
    
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        GameOver();
    }
    questionCounter++;
    docProgressBarFullFill.css("width", `${(questionCounter / MAX_QUESTIONS) * 100}%`);
    docQuestionText.text(`Question: ${questionCounter}/${MAX_QUESTIONS}`);
    let questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    docQuestion.html(currentQuestion['question']);
    for (let x = 0; x < 4; x++) {
        if ($(docChoices[x]).attr("id") == `choice${x + 1}`) {
            $(docChoices[x]).html(currentQuestion[`choice${x + 1}`])
        }
    }

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

    // Timer(timeCounter);

}

finalScore = () => {
    docScore.text(score);
}

docChoices.on("click", (e) => {
    if (!acceptingAnswers) { return; };
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    if (selectedAnswer == currentQuestion.answer) {
        $(e.target).attr("data-right", "correct")
        $(e.target).addClass("correct")
    }
    else {
        $(e.target).addClass("incorrect")
    }
    if ($(e.target).attr("data-right") === 'correct') {
        score += CORRECT_BONUS;
        docScore.text(score)
    }
    $(e).addClass("incorrect");
    setTimeout(() => {
        $(e.target).attr("data-right", "")
        $(e.target).removeClass("correct")
        $(e.target).removeClass("incorrect")
        getNewQuestion();
    }, 1000);

})

docBtnChoose.on("click", (e) => {
    e.preventDefault();
    cat = docCat.val()
    level = docLevel.val()
    APIURL = `https://opentdb.com/api.php?amount=${NumberofQuestions}&category=${cat}&difficulty=${level}&type=multiple `
    fetch(APIURL)
        .then(res => {
            return res.json();
        })
        .then(loadedQuestions => {
            if (loadedQuestions.response_code == 0) {

                response = true;
                questions = loadedQuestions.results.map(loadQuestion => {

                    const formattedQuestion = {
                        question: loadQuestion.question
                    };

                    const answerChoices = [...loadQuestion.incorrect_answers];
                    formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
                    answerChoices.splice(formattedQuestion.answer - 1, 0, loadQuestion.correct_answer);
                    answerChoices.forEach((choice, index) => {
                        formattedQuestion["choice" + (index + 1)] = choice;
                    });
                    return formattedQuestion;
                })

                startGame();
                $("div.titleScreen").hide();
                $("div.gameOver").hide();
                $("div.game").show();
            }
            else {
                $("#error").show();
                response = false;
            }
        })
        .catch(err => {
        });



});