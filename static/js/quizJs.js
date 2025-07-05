// quizJs.js

let currentQuestionIndex = 0;
let selectedAnswers = {};  // { questionIndex: 'A'/'B'/... }

// Show question at given index and hide others
function showQuestion(index) {
    const allQuestions = document.querySelectorAll('.question-block');
    allQuestions.forEach((q, i) => {
        q.classList.toggle('hidden', i !== index);
    });
    currentQuestionIndex = index;
    updateNavigationButtons();
    updateProgress();
    highlightCurrentQuestionNumber();
}

// Highlight selected option for current question
function selectOption(questionIndex, optionLetter) {
    selectedAnswers[questionIndex] = optionLetter;

    // Clear previous selection styling
    const optionsList = document.getElementById(`optionsList${questionIndex}`);
    if (!optionsList) return;

    optionsList.querySelectorAll('.option').forEach(optionDiv => {
        optionDiv.classList.remove('selected');
    });

    // Add selected styling
    const optionElements = optionsList.querySelectorAll('.option');
    optionElements.forEach(optionDiv => {
        const letterDiv = optionDiv.querySelector('.option-letter');
        if (letterDiv && letterDiv.textContent === optionLetter) {
            optionDiv.classList.add('selected');
        }
    });

    updateProgress();
}

// Update progress text and progress bar width
function updateProgress() {
    const totalQuestions = document.querySelectorAll('.question-block').length;
    const answeredCount = Object.keys(selectedAnswers).length;

    const questionInfo = document.getElementById('questionInfo');
    const answeredInfo = document.getElementById('answeredInfo');
    const progressFill = document.getElementById('progressFill');

    if (questionInfo) {
        questionInfo.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    }
    if (answeredInfo) {
        answeredInfo.textContent = `${answeredCount} answered`;
    }
    if (progressFill) {
        const percent = (answeredCount / totalQuestions) * 100;
        progressFill.style.width = `${percent}%`;
    }
}

// Enable/disable Prev and Next buttons based on current question
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const totalQuestions = document.querySelectorAll('.question-block').length;

    if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
    if (nextBtn) nextBtn.disabled = currentQuestionIndex === totalQuestions - 1;
}

// Highlight the current question number in navigation
function highlightCurrentQuestionNumber() {
    const questionNumbers = document.querySelectorAll('.question-number');
    questionNumbers.forEach((qn, i) => {
        qn.classList.toggle('current', i === currentQuestionIndex);
    });
}

// Navigation button handlers
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
}

function nextQuestion() {
    const totalQuestions = document.querySelectorAll('.question-block').length;
    if (currentQuestionIndex < totalQuestions - 1) {
        showQuestion(currentQuestionIndex + 1);
    }
}

// Click on question number navigation
function goToQuestion(index) {
    showQuestion(index);
}

// Submit quiz handler
function submitQuiz() {
    const totalQuestions = document.querySelectorAll('.question-block').length;

    // Check if all questions answered
    if (Object.keys(selectedAnswers).length < totalQuestions) {
        if (!confirm("You have unanswered questions. Are you sure you want to submit?")) {
            return;
        }
    }

    // Prepare data to send (example format)
    const answersPayload = [];
    for (let i = 0; i < totalQuestions; i++) {
        answersPayload.push({
            question_index: i,
            answer: selectedAnswers[i] || null
        });
    }

    // You can send this data via fetch/ajax or post form here
    // For demonstration, just alert and log:
    console.log("Submitting answers:", answersPayload);
    alert("Quiz submitted! Check console for answers payload.");

    // TODO: Implement actual submission, e.g., via fetch POST
}

// Initialize quiz UI on page load
document.addEventListener('DOMContentLoaded', () => {
    showQuestion(0);
    updateProgress();
    updateNavigationButtons();
});
