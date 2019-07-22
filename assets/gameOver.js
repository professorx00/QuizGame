const username = $("#username");
const saveScoreBtn = $("#saveScoreBtn");
const finalScore = $("#finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores =  JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;
console.log(highScores);

finalScore.innerText = mostRecentScore;


username.on('keyup', ()=>{
    saveScoreBtn.disabled = !username.value;
});


saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    }
    console.log(score)
    highScores.push(score);
    highScores.sort((a,b) =>b.score-a.score)
    highScores.splice(5);
    console.log(highScores)

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("index.html")

}