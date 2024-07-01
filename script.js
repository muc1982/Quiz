const questions = [
    {
        "question": "Welches Tier ist das größte auf der Welt?",
        "answers": ["Elefant", "Blauwal", "Giraffe", "Hai"],
        "correct": 1
    },
    {
        "question": "Welches Tier kann seine Farbe ändern?",
        "answers": ["Frosch", "Chameleon", "Schlange", "Löwe"],
        "correct": 1
    },
    {
        "question": "Welches dieser Tiere lebt im Wasser?",
        "answers": ["Adler", "Pinguin", "Kamel", "Seehund"],
        "correct": 3
    },
    {
        "question": "Welches Tier hat den längsten Hals?",
        "answers": ["Kamel", "Elefant", "Giraffe", "Pferd"],
        "correct": 2
    },
    {
        "question": "Welches Tier ist das schnellste an Land?",
        "answers": ["Löwe", "Gazelle", "Gepard", "Tiger"],
        "correct": 2
    },
    {
        "question": "Welches Tier ist das größte Raubtier auf dem Land?",
        "answers": ["Löwe", "Tiger", "Bär", "Leopard"],
        "correct": 1
    },
    {
        "question": "Welches dieser Tiere ist ein Säugetier?",
        "answers": ["Pinguin", "Krokodil", "Hai", "Fledermaus"],
        "correct": 3
    },
    {
        "question": "Welches Tier hat das dickste Fell?",
        "answers": ["Eisbär", "Löwe", "Wolf", "Bär"],
        "correct": 0
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

function loadQuiz() {
    document.getElementById('retry-button').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('result').innerHTML = '';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    const questionContainer = document.getElementById('question-container');
    const answerButtons = document.getElementById('answer-buttons');

    questionContainer.innerHTML = `<div class="question"><h2>${question.question}</h2></div>`;
    answerButtons.innerHTML = '';

    question.answers.forEach((answer, i) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(i, question.correct));
        answerButtons.appendChild(button);
    });

    updateProgressBar();
}

function selectAnswer(selectedIndex, correctIndex) {
    const answerButtons = document.getElementById('answer-buttons').children;

    if (selectedIndex === correctIndex) {
        answerButtons[selectedIndex].classList.add('correct');
        correctAnswers++;
    } else {
        answerButtons[selectedIndex].classList.add('incorrect');
        answerButtons[correctIndex].classList.add('correct');
    }

    Array.from(answerButtons).forEach(button => button.disabled = true);
    document.getElementById('next-button').style.display = 'block';
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        document.getElementById('next-button').style.display = 'none';
    } else {
        showResult();
    }
}

function showResult() {
    const resultElement = document.getElementById('result');
    const quizContainer = document.getElementById('quiz-container');
    const nextButton = document.getElementById('next-button');
    const retryButton = document.getElementById('retry-button');

    if ((correctAnswers / questions.length) >= 0.7) {
        resultElement.innerHTML = `<div class="trophy">🏆</div> Glückwunsch! Sie haben das Quiz erfolgreich bestanden!`;
    } else {
        resultElement.innerHTML = `<div class="sad-face">😢</div> Leider nicht bestanden. Versuchen Sie es erneut!`;
    }

    retryButton.style.display = 'block';
    quizContainer.style.display = 'none';
    nextButton.style.display = 'none';
}

function retryQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('result').innerHTML = '';
    document.getElementById('retry-button').style.display = 'none';
    loadQuiz();
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.innerText = `${Math.round(progress)}%`;
}

document.addEventListener('DOMContentLoaded', loadQuiz);
