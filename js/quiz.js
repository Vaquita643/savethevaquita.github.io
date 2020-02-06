// Questions to be asked
const QUESTIONS_PER_QUIZ = 3;
const ALL_QUESTIONS = [
    {
        question: "What type of animal is a Vaquita?",
        answers: [
            "Porpoise",
            "Turtle",
            "Fish",
            "Squid"
        ],
        correctAnswer: 0
    },

    {
        question: "What is the current status of the Vaquita?",
        answers: [
            "Critically Endangered",
            "Extinct",
            "At Risk",
            "Normal"
        ],
        correctAnswer: 0
    },

    {
        question: "What is the estimated population of Vaquitas remaining?",
        answers: [
            "10-20",
            "100-200",
            "1000-2000"
        ],
        correctAnswer: 0
    },

    {
        question: "How long do scientists estimate until the Vaquita will be extinct?",
        answers: [
            "Less than a year",
            "1-2 years",
            "3-4 years",
            "5+ years"
        ],
        correctAnswer: 0
    }
];

let quizState = {};

// Page Elements
const elQuizIntro = document.getElementById('quizIntro');
const elQuizQuestion = document.getElementById('quizQuestion');
const elQuizScore = document.getElementById('quizScore');
const elPages = [elQuizIntro, elQuizQuestion, elQuizScore];

// Start page elements
const elStartQuizBtn = document.getElementById("startQuiz");

// Quiz page elements
const elQuestionNumber = document.getElementById("questionNumber");
const elTotalQuestions = document.getElementById("totalQuestions");
const elQuestion = document.getElementById("question");
const elAnswers = document.getElementById("answers");

// Score page elements
const elQuizFinishMessageHeader = document.getElementById("quizFinishMessageHeader");
const elQuizFinishMessage = document.getElementById("quizFinishMessage");
const elQuizRestart = document.getElementById("quizRestart");

const setPage = (elPage) => {
    // Hide all sub pages
    for (const page of elPages) {
        page.style.display = 'none';
    }

    // Show the requested sub page
    elPage.style.display = 'block';
};

// Gets the number of questions from the question pool in a shuffled order.
const generateQuestions = (count) => {
    // Clone the question list and shuffle
    let clonedQuestions = Array.from(ALL_QUESTIONS);
    clonedQuestions.sort(() => Math.random() - 0.5);

    // Resize the array to the requested question count, taking care to limit it to the array size
    clonedQuestions = clonedQuestions.slice(0, Math.min(clonedQuestions.length, count));

    // Shuffle the answers
    return clonedQuestions.map(question => {
        const { answers, correctAnswer } = question;
        const correctAnswerText = answers[correctAnswer];

        const answersShuffled = Array.from(answers)
            .sort(() => Math.random() - 0.5);

        const newCorrectAnswerIndex = answersShuffled.findIndex(x => x === correctAnswerText);

        return {...question, answers: answersShuffled, correctAnswer: newCorrectAnswerIndex};
    });
};

const finishQuiz = () => {
    const percentage = (quizState.correct / quizState.questions.length) * 100;

    let header;
    let text;
    if (percentage > 75) {
        header = "Congratulations!";
        text = `You got ${Math.round(percentage)}%`;
    } else if (percentage > 50) {
        header = "Nice!";
        text = `You got ${Math.round(percentage)}%. Why not try for 75%?`;
    } else if (percentage > 25) {
        header = "Nice try!";
        text = `You got ${Math.round(percentage)}%. Have another go after reading more about Vaquitas!`;
    } else {
        header = "Bad Luck.";
        text = `You got ${Math.round(percentage)}%. Why not read some information from the website and have another go?`;
    }

    elQuizFinishMessageHeader.innerText = header;
    elQuizFinishMessage.innerText = text;

    setPage(elQuizScore);
}

const processAnswer = (indexClicked) => {
    const correct = indexClicked == quizState.correctAnswer;
    const elCorrectBtn = document.getElementById(`answer-${quizState.correctAnswer}`);
    const elClickedBtn = document.getElementById(`answer-${indexClicked}`);
    
    elCorrectBtn.classList.remove("btn-primary");
    elCorrectBtn.classList.add("btn-success");
    
    if (correct) {
        quizState.correct++;
    } else {
        elClickedBtn.classList.remove("btn-primary");
        elClickedBtn.classList.add("btn-danger");
    }

    setTimeout(() => {
        if (quizState.questionIndex === quizState.questions.length - 1) {
            finishQuiz();
            return;
        }
    
        quizState.questionIndex++;
        selectQuestion(quizState.questionIndex);
    }, 2000);

};

const selectQuestion = (index) => {
    const { question, answers, correctAnswer } = quizState.questions[index];
    
    quizState.correctAnswer = correctAnswer;

    elQuestion.innerText = question;
    elQuestionNumber.innerText = `${index + 1}`;

    // Clear answers
    elAnswers.innerText = "";

    for (const answerIndex in answers) {
        const answerIndexCopy = answerIndex;
        const answer = answers[answerIndex];

        const elAnswerBtn = document.createElement("button");
        elAnswerBtn.innerText = answer;
        elAnswerBtn.classList = "btn btn-primary answer";
        elAnswerBtn.id = `answer-${answerIndex}`;
        elAnswerBtn.addEventListener("click", () => {
            processAnswer(answerIndexCopy);
        });

        elAnswers.appendChild(elAnswerBtn);
    }
}

// Start the quiz
const startQuiz = () => {
    quizState = {};
    quizState.questions = generateQuestions(QUESTIONS_PER_QUIZ);
    quizState.correct = 0;
    quizState.questionIndex = 0;
    elTotalQuestions.innerText = `${quizState.questions.length}`;
    
    selectQuestion(0);
    setPage(elQuizQuestion);
}

elStartQuizBtn.addEventListener("click", () => startQuiz());
elQuizRestart.addEventListener("click", () => startQuiz());

setPage(elQuizIntro);