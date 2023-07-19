const questions=[
    {
        question: "Which is the smallest planet within our solar system?",
        answers: [
            {text: "Mercury", correct: true},
            {text: "Mars", correct: false},
            {text: "Sturn", correct: false},
            {text: "Venus", correct: false}
        ]
    },
    {
        question: "Which planet has the most moons?",
        answers: [
            {text: "Neptune", correct:false},
            {text: "Sturn", correct: true},
            {text: "Venus", correct: false},
            {text: "Mars", correct: false}
        ]
    },
    {
        question: "Which planet has the fastest rotation?",
        answers: [
            {text: "Mercury", correct:false },
            {text: "Mars", correct: false},
            {text: "Jupiter", correct: true},
            {text: "Venus", correct: false}
        ]
    },
    {
        question: "How long is one year on Jupiter?",
        answers: [
            {text: "12 Earth years", correct: true},
            {text: "1 Earth years", correct: false},
            {text: "6 Earth years", correct: false},
            {text: "20 Earth years", correct: false}
        ]
    }
];

const qst = document.getElementById("question");
const qstAnswers = document.getElementById("qst-answers");
const nextbtn = document.getElementById("next-btn");

let currentQstIndex = 0;
let score = 0;

function startQuiz(){
    currentQstIndex = 0;
    score = 0;
    nextbtn.innerHTML ="Next";
    showQst();
}

function showQst(){
    resetState();
    let currentQst = questions[currentQstIndex]
    let qstNum = currentQstIndex + 1;
    qst.innerHTML = qstNum +". " + currentQst.question;

    currentQst.answers.forEach(answer => { 
        const li = document.createElement("li")
        li.innerHTML = answer.text;
        li.classList.add("ans");
        qstAnswers.appendChild(li);
        if (answer.correct){
            li.dataset.correct = answer.correct;
        }
        li.addEventListener("click", selectAnswer);

    })

}
function resetState(){
    nextbtn.style.display = "none";
    while(qstAnswers.firstChild){
        qstAnswers.removeChild(qstAnswers.firstChild);
    }
}

let hasAnswered = false; // Flag variable to keep track of whether the user has answered

function selectAnswer(e) {
    if (hasAnswered) {
       
        return; // If the user has already answered, exit the function
    }

    const selectedLi = e.target;
    const isCorrect = selectedLi.dataset.correct === "true";

    if (isCorrect) {
        selectedLi.classList.add("correct");
        score++;
    } else {
        selectedLi.classList.add("wrong");
        // If the user's answer is wrong, show the correct answer by adding the "correct" class
        Array.from(qstAnswers.children).forEach((li) => {
            if (li.dataset.correct === "true") {
                li.classList.add("correct");
               
            }
        });
    }

    hasAnswered = true; // Set the flag to true to indicate the user has answered
    nextbtn.style.display = "block";
   
}

function showScore(){
    resetState();
    qst.innerHTML =` You scored ${score} out of ${questions.length}!`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display = "block";
}

function handleNextButton(){
    currentQstIndex++;
    hasAnswered = false;
    if(currentQstIndex < questions.length){
        showQst()
    }else{
        showScore();
    }

}


nextbtn.addEventListener("click", () =>{
    if(currentQstIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz()
