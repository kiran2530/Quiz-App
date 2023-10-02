const questions = [
    {
        question : "What does the abbreviation HTML stand for?",
        answers : [
            {text: "HyperText Markup Language",correct:true},
            {text: "HighText Markup Language",correct:false},
            {text: "HyperText MarkDown Language",correct:false},
            {text: "None of the above",correct:false},
        ]
    },
    {
        question : "How many sizes of headers are available in HTML by default?",
        answers : [
            {text: "5",correct:false},
            {text: "1",correct:false},
            {text: "3",correct:false},
            {text: "6",correct:true},
        ]
    },
    {
        question : "What is the smallest header in HTML by default?",
        answers : [
            {text: "h1",correct:false},
            {text: "h2",correct:false},
            {text: "h6",correct:true},
            {text: "h4",correct:false},
        ]
    },
    {
        question : "What are the types of lists available in HTML?",
        answers : [
            {text: "Ordered, Unordered List",correct:true},
            {text: "Bulleted, Numbered List",correct:false},
            {text: "Named, Unnamed List",correct:false},
            {text: "None of the above",correct:false},
        ]
    },
    {
        question : "HTML files are saved by default with the extension?",
        answers : [
            {text: ".h",correct:false},
            {text: ".html",correct:true},
            {text: ".ht",correct:false},
            {text: "None of the above",correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const ansButtons = document.getElementById("ans-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0 ;
let score = 0 ;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0 ;
    nextButton.innerHTML = "Next" ;
    showQuestion();
}

function showQuestion() {
    reseteAnsButtons();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNO + ". " + currentQuestion.question ;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansButtons.appendChild(button) ;
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAns)
    });
}

function reseteAnsButtons() {
    nextButton.style.display = "none";
    while(ansButtons.firstChild) {
        ansButtons.removeChild(ansButtons.firstChild);
    }
}

function selectAns(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(ansButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScrore() {
    reseteAnsButtons();
    questionElement.innerHTML = `You Score ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScrore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex< questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();