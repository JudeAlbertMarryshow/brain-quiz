console.log("Quiz.js started loading");

// Variables to track quiz state
let currentQuestionIndex = 0;
let questions = [
  {
    question: "A flashing red traffic light signifies that a driver should do what?",
    options: ["stop", "speed up", "proceed with caution", "honk the horn"],
    correctAnswer: "stop"
  },
  // ... (rest of the questions remain the same)
];

let userAnswers = [];
let timerInterval;
let timeLeft = 30;

// DOM elements
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const timerEl = document.getElementById('timer');
const progressBar = document.getElementById('progress');

// Log DOM elements
console.log("DOM Elements:", {
  currentQuestionEl,
  totalQuestionsEl,
  questionTextEl,
  optionsContainerEl,
  prevBtn,
  nextBtn,
  submitBtn,
  timerEl,
  progressBar
});

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded in quiz.js");
  console.log("Document readyState:", document.readyState);

  // === APPLY SAVED USER SETTINGS ===
  const savedDarkMode = localStorage.getItem("darkMode");
  const savedFontSize = localStorage.getItem("fontSize");

  if (savedDarkMode === "true") {
    document.body.classList.add("dark-mode");
  }

  if (savedFontSize) {
    document.documentElement.style.fontSize = savedFontSize;
  }

  console.log("Quiz is initializing...");

  // Initialize user answers array with nulls
  userAnswers = Array(questions.length).fill(null);

  // Set total questions display
  totalQuestionsEl.textContent = questions.length;

  // Display first question
  console.log("Attempting to show first question");
  showQuestion(0);

  // Start timer
  startTimer();

  // Set up button listeners
  prevBtn.addEventListener('click', previousQuestion);
  nextBtn.addEventListener('click', nextQuestion);
  submitBtn.addEventListener('click', finishQuiz);
});

// Show a specific question
function showQuestion(index) {
  console.log(`Trying to show question ${index}`);
  const q = questions[index];
  console.log("Question object:", JSON.stringify(q));

  // Set question number and text
  currentQuestionEl.textContent = index + 1;
  questionTextEl.textContent = q.question;

  // Clear and recreate options
  optionsContainerEl.innerHTML = '';

  for (let i = 0; i < q.options.length; i++) {
    const button = document.createElement('button');
    button.textContent = q.options[i];
    button.classList.add('option-btn');

    // Add selected class if this was the user's answer
    if (userAnswers[index] === q.options[i]) {
      button.classList.add('selected');
    }

    // Add click handler
    button.addEventListener('click', function() {
      selectAnswer(q.options[i]);
    });

    optionsContainerEl.appendChild(button);
  }

  // Update buttons
  updateNavButtons();

  // Update progress bar
  updateProgressBar();
}

// (Rest of the code remains the same as in the original file)
// ... [paste the rest of the original code here]

// Update the progress bar
function updateProgressBar() {
  const progress = (currentQuestionIndex / (questions.length - 1)) * 100;
  progressBar.style.width = `${progress}%`;
}

// Handle answer selection
function selectAnswer(answer) {
  userAnswers[currentQuestionIndex] = answer;

  // Update UI
  const options = optionsContainerEl.querySelectorAll('.option-btn');
  options.forEach(button => {
    button.classList.remove('selected');
    if (button.textContent === answer) {
      button.classList.add('selected');
    }
  });
}

// Go to previous question
function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
  }
}

// Go to next question
function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  }
}

// Update navigation buttons
function updateNavButtons() {
  prevBtn.disabled = currentQuestionIndex === 0;

  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
  } else {
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
  }
}

// Timer functions
function startTimer() {
  timeLeft = 30;
  updateTimerDisplay();

  clearInterval(timerInterval);
  timerInterval = setInterval(function() {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);

      if (currentQuestionIndex < questions.length - 1) {
        nextQuestion();
      } else {
        finishQuiz();
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerEl.textContent = `Time: ${timeLeft}s`;

  if (timeLeft <= 10) {
    timerEl.style.color = '#cc0000';
  } else {
    timerEl.style.color = '#fc94df';
  }
}

// Submit quiz and go to results
function finishQuiz() {
  clearInterval(timerInterval);

  // Calculate score
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].correctAnswer) {
      score++;
    }
  }

  // Convert to percentage
  const percentage = Math.round((score / questions.length) * 100);

  // Save score for results page
  localStorage.setItem('quizScore', percentage);
  localStorage.setItem('totalQuestions', questions.length);
  localStorage.setItem('correctAnswers', score);

  // Go to results page
  window.location.href = 'results.html';
}
