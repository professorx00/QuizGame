const docQuestion = $("#question");
const docChoices = $(".choice-text");
const docScore = $("#score");
const docProgressText = $("#progressText");
const docProgressBarFullFill = $("#progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions =[]
let questions = [];
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
let choice = [];




fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        // console.log(loadedQuestions.results); 
        // console.log(loadedQuestions.results)
        questions = loadedQuestions.results.map(loadQuestion => {
           
            const formattedQuestion = {
                question: loadQuestion.question
            };

            const answerChoices = [...loadQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            // console.log(formattedQuestion.answer)
            answerChoices.splice(formattedQuestion.answer - 1, 0, loadQuestion.correct_answer);
            // console.log("the answer are");
            // console.log(answerChoices)
            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            });
            // console.log(formattedQuestion)
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
    // game.classList.remove("hidden");
    // loader.classList.add('hidden');
}
GameOver = () => {
    console.log("Game Over");
}

getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter>=MAX_QUESTIONS){
            GameOver();
        }
    questionCounter++;
    // console.log((questionCounter / MAX_QUESTIONS) * 100);
    docProgressBarFullFill.css("width", `${(questionCounter / MAX_QUESTIONS) * 100}%`);
    docProgressText.text(`Question: ${questionCounter}/${MAX_QUESTIONS}`);
    let questionIndex = Math.floor(Math.random() * availableQuestions.length);
    // console.log(questionIndex);
    // console.log(availableQuestions);
    // console.log(availableQuestions[questionIndex].question);
    currentQuestion = availableQuestions[questionIndex].question;
    // console.log(currentQuestion)
    docQuestion.append(currentQuestion);
    for(let x =0,x<docChoices.length;x++){
        console.log(docChoices[x]);
    }
    // choices.forEach(choice => {
    //     console.log(choice)
    //     const number = choice.attr("data-number")
    //     docChoices.append(currentQuestion['choice' + number])
    // });

}