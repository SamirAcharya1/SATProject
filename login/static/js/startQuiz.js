let selectedQuestions = null;
let selectedSubject = null;

document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) return;

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-dropdown')) {
            closeAllDropdowns();
        }
    });
});

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const button = dropdown.querySelector('.dropdown-button');
    const menu = dropdown.querySelector('.dropdown-menu');

    document.querySelectorAll('.custom-dropdown').forEach(dd => {
        if (dd.id !== dropdownId) {
            dd.querySelector('.dropdown-button').classList.remove('active');
            dd.querySelector('.dropdown-menu').classList.remove('active');
        }
    });

    button.classList.toggle('active');
    menu.classList.toggle('active');
}

function closeAllDropdowns() {
    document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        dropdown.querySelector('.dropdown-button').classList.remove('active');
        dropdown.querySelector('.dropdown-menu').classList.remove('active');
    });
}

function selectQuestions(count) {
    selectedQuestions = count;

    const dropdown = document.getElementById('questionsDropdown');
    const button = dropdown.querySelector('.dropdown-button');
    const content = button.querySelector('.dropdown-content');

    dropdown.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('selected'));

    const selectedOption = dropdown.querySelector(`[data-questions="${count}"]`);
    selectedOption.classList.add('selected');

    const title = selectedOption.querySelector('.option-title').textContent;
    const description = selectedOption.querySelector('.option-description').textContent;

    content.innerHTML = `
        <div class="dropdown-title">${title}</div>
        <div class="dropdown-subtitle">${description}</div>
    `;

    closeAllDropdowns();
    updateSummary();
    updateStartButton();
}

function selectSubject(subject) {
    selectedSubject = subject;

    const dropdown = document.getElementById('subjectDropdown');
    const button = dropdown.querySelector('.dropdown-button');
    const content = button.querySelector('.dropdown-content');

    dropdown.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('selected'));

    const selectedOption = dropdown.querySelector(`[data-subject="${subject}"]`);
    selectedOption.classList.add('selected');

    const title = selectedOption.querySelector('.option-title').textContent;
    const description = selectedOption.querySelector('.option-description').textContent;

    content.innerHTML = `
        <div class="dropdown-title">${title}</div>
        <div class="dropdown-subtitle">${description}</div>
    `;

    closeAllDropdowns();
    updateSummary();
    updateStartButton();
}

function updateSummary() {
    const summaryDiv = document.getElementById('quizSummary');
    const summaryContent = document.getElementById('summaryContent');

    if (selectedQuestions && selectedSubject) {
        const subjectNames = {
            'Math': 'Mathematics',
            'English': 'English',
            'Mixed': 'Mixed Practice'
        };

        const estimatedTime = {
            5: '8-10 minutes',
            10: '15-20 minutes',
            15: '25-30 minutes',
            20: '35-40 minutes'
        };

        summaryContent.innerHTML = `
            <div class="summary-item">
                <span class="summary-label">Questions:</span>
                <span class="summary-value">${selectedQuestions} questions</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Subject:</span>
                <span class="summary-value">${subjectNames[selectedSubject]}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Estimated Time:</span>
                <span class="summary-value">${estimatedTime[selectedQuestions]}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Format:</span>
                <span class="summary-value">Multiple choice with feedback</span>
            </div>
        `;

        summaryDiv.classList.add('show');
    } else {
        summaryDiv.classList.remove('show');
    }
}

function updateStartButton() {
    const startBtn = document.getElementById('startQuizBtn');
    startBtn.disabled = !(selectedQuestions && selectedSubject);
}

function setFormValues() {
    if (!(selectedQuestions && selectedSubject)) {
        alert('Please select both number of questions and subject area.');
        return false;
    }

    document.getElementById('questionCountInput').value = selectedQuestions;
    document.getElementById('subjectInput').value = selectedSubject;
    return true;
}
