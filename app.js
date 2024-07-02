let currentQuestionIndex = 0;
let score = 0;
let timer;
const TIME_LIMIT = 15;
let timeRemaining = TIME_LIMIT;
let shuffledQuestions = [];

function startExam() {
    currentQuestionIndex = 0;
    score = 0;
    shuffledQuestions = shuffle(questions).slice(0, 10);
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    clearInterval(timer);
    document.getElementById('next-button').classList.add('hidden');
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <p class="text-xl mb-4">${question.question}</p>
        ${question.options.map(option => `<button class="option bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg mb-2 w-full" onclick="selectAnswer('${option}', '${question.correctAnswer}')">${option}</button>`).join('')}
    `;
    timeRemaining = TIME_LIMIT;
    document.getElementById('time').textContent = timeRemaining;
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('time').textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            document.querySelectorAll('.option').forEach(button => {
                button.disabled = true;
            });
            document.getElementById('next-button').classList.remove('hidden');
        }
    }, 1000);
}

function selectAnswer(selectedOption, correctAnswer) {
    clearInterval(timer);
    document.querySelectorAll('.option').forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('bg-green-500', 'text-white');
        } else if (button.textContent === selectedOption) {
            button.classList.add('bg-red-500', 'text-white');
        }
    });
    if (selectedOption === correctAnswer) {
        score++;
    }
    document.getElementById('next-button').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    let message = '';
    if (score >= 8) {
        message = '¡Excelente! Has obtenido una puntuación alta.';
    } else if (score >= 5) {
        message = '¡Bien hecho! Has aprobado el examen.';
    } else if (score >= 1) {
        message = 'Has aprobado, pero puedes mejorar.';
    } else {
        message = 'No has logrado pasar el examen. ¡Sigue practicando!';
    }
    resultContainer.innerHTML = `<p class="text-xl font-semibold">Tu puntuación: ${score}</p><p>${message}</p>`;

    // Almacena la puntuación en localStorage
    localStorage.setItem('score', score);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
