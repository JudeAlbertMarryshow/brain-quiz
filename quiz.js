// Enhanced Quiz JavaScript
let allQuestions = []; // Will store all questions from JSON
let selectedQuestions = []; // Questions for current game

// Function to fetch questions from JSON
async function fetchQuestions() {
  try {
    const response = await fetch('questions.json');
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    allQuestions = await response.json();
    console.log(`Total questions loaded: ${allQuestions.length}`);
  } catch (error) {
    console.error('Error loading questions:', error);
    // Fallback to default questions if fetch fails
    allQuestions = [
      {
        question: "A flashing red traffic light signifies that a driver should do what?",
        options: ["stop", "speed up", "proceed with caution", "honk the horn"],
        correctAnswer: "stop"
      }
      // Add more fallback questions if needed
    ];
  }
}

// Function to randomly select unique questions
function selectUniqueQuestions(count) {
  // Create a copy of all questions to avoid modifying original array
  let availableQuestions = [...allQuestions];
  
  // Shuffle the available questions
  for (let i = availableQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableQuestions[i], availableQuestions[j]] = [availableQuestions[j], availableQuestions[i]];
  }
  
  // Select the first 'count' questions
  selectedQuestions = availableQuestions.slice(0, count);
  
  return selectedQuestions;
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async function() {
  console.log("DOMContentLoaded event fired in quiz.js");
  
  // Fetch questions first
  await fetchQuestions();
  
  // Select 10 unique questions
  const questions = selectUniqueQuestions(10);
  
  // Get all critical elements
  const elements = {
    currentQuestion: document.getElementById('current-question'),
    totalQuestions: document.getElementById('total-questions'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    submitBtn: document.getElementById('submit-btn'),
    timerEl: document.getElementById('timer'),
    progressBar: document.getElementById('progress')
  };

  // Verify elements exist
  if (!elements.questionText || !elements.optionsContainer) {
    console.error("Critical quiz elements not found");
    return;
  }

  // Update total questions display
  elements.totalQuestions.textContent = questions.length;

  // Quiz state tracking
  let currentQuestionIndex = 0;
  let userAnswers = Array(questions.length).fill(null);
  let timerInterval;
  let timeLeft = 60;

  // Timer functions
  function startTimer() {
    timeLeft = 60;
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
    elements.timerEl.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 10) {
      elements.timerEl.style.color = '#cc0000';
    } else {
      elements.timerEl.style.color = '#fc94df';
    }
  }

  // Show a specific question
  function showQuestion(index) {
    const q = questions[index];
    
    // Update question text
    elements.currentQuestion.textContent = index + 1;
    elements.questionText.textContent = q.question;

    // Clear previous options
    elements.optionsContainer.innerHTML = '';

    // Create option buttons
    const optionKeys = ['A', 'B', 'C', 'D'];
    optionKeys.forEach(key => {
      const optionBtn = document.createElement('button');
      optionBtn.textContent = q[key];
      optionBtn.classList.add('option-btn');
      
      // Add selected class if this was the user's previous answer
      if (userAnswers[index] === q[key]) {
        optionBtn.classList.add('selected');
      }
      
      // Handle option selection
      optionBtn.addEventListener('click', function() {
        // Remove 'selected' from all buttons
        elements.optionsContainer.querySelectorAll('.option-btn')
          .forEach(btn => btn.classList.remove('selected'));
        
        // Add 'selected' to clicked button
        optionBtn.classList.add('selected');
        
        // Store user's answer
        userAnswers[index] = q[key];
      });

      elements.optionsContainer.appendChild(optionBtn);
    });

    // Update navigation buttons
    updateNavButtons();

    // Update progress bar
    updateProgressBar();
  }

  // Update navigation buttons
  function updateNavButtons() {
    elements.prevBtn.disabled = currentQuestionIndex === 0;

    if (currentQuestionIndex === questions.length - 1) {
      elements.nextBtn.style.display = 'none';
      elements.submitBtn.style.display = 'block';
    } else {
      elements.nextBtn.style.display = 'block';
      elements.submitBtn.style.display = 'none';
    }
  }

  // Update progress bar
  function updateProgressBar() {
    const progress = (currentQuestionIndex / (questions.length - 1)) * 100;
    elements.progressBar.style.width = `${progress}%`;
  }

  // Previous question
  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(currentQuestionIndex);
    }
  }

  // Next question
  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    }
  }

  // Finish quiz
  function finishQuiz() {
    clearInterval(timerInterval);

    // Calculate score
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i][questions[i].answer]) {
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

  // Set up button listeners
  elements.prevBtn.addEventListener('click', previousQuestion);
  elements.nextBtn.addEventListener('click', nextQuestion);
  elements.submitBtn.addEventListener('click', finishQuiz);

  // Initial question display
  showQuestion(0);

  // Start timer
  startTimer();
});
