const docQuestion = $("#question");
const docChoices = $(".choice-text");
const docScore = $("#scoreDisplay");
const docProgressText = $("#progressText");
const docProgressBarFullFill = $("#progressBarFull");
const docHighSore = $("#highscore");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions =[]
let questions = [];
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
let choices = [];

let highScores = {};




fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
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
    })
    .catch(err => {
        console.log(err);
    });

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
}
GameOver = () => {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("gameOver.html");
}

getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter>=MAX_QUESTIONS){
            GameOver();
        }
    questionCounter++;
    docProgressBarFullFill.css("width", `${(questionCounter / MAX_QUESTIONS) * 100}%`);
    docProgressText.text(`Question: ${questionCounter}/${MAX_QUESTIONS}`);
    let questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    docQuestion.html(currentQuestion['question']);
    for(let x=0;x<4;x++){
        if($(docChoices[x]).attr("id")==`choice${x+1}`){
            $(docChoices[x]).html(currentQuestion[`choice${x+1}`])
        }
    }
    
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    
}


docChoices.on("click",(e)=>{
    if (!acceptingAnswers) { return; };
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    if (selectedAnswer == currentQuestion.answer) {
        $(e.target).attr("data-right","correct")
        $(e.target).addClass("correct")
        console.log($(e.target));
    }
    else{
        $(e.target).addClass("incorrect")
    }
    console.log($(e.target.class))
    if ( $(e.target).attr("data-right") === 'correct') {
        score += CORRECT_BONUS;
        docScore.text(score)
    }
    $(e).addClass("incorrect");
    setTimeout(() => {
        $(e.target).attr("data-right","")
        $(e.target).removeClass("correct")
        $(e.target).removeClass("incorrect")
        getNewQuestion();
    }, 1000);

})

