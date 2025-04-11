console.log("Quiz.js started loading");

// Basic questions array
const questions = [
  {
    question: "A flashing red traffic light signifies that a driver should do what?",
    options: ["stop", "speed up", "proceed with caution", "honk the horn"],
    correctAnswer: "stop"
  }
];

// Attempt to reference DOM elements with error logging
function safeGetElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.error(`Element with id '${id}' not found!`);
  }
  return element;
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOMContentLoaded event fired in quiz.js");
  
  // Get all critical elements
  const elements = {
    currentQuestion: safeGetElement('current-question'),
    totalQuestions: safeGetElement('total-questions'),
    questionText: safeGetElement('question-text'),
    optionsContainer: safeGetElement('options-container')
  };

  // Try to show the first question
  function showFirstQuestion() {
    console.log("Attempting to show first question");
    
    if (!elements.questionText || !elements.optionsContainer) {
      console.error("Cannot show question - missing elements");
      return;
    }

    // Set question text
    elements.questionText.textContent = questions[0].question;

    // Clear and populate options
    elements.optionsContainer.innerHTML = '';
    questions[0].options.forEach(option => {
      const optionBtn = document.createElement('button');
      optionBtn.textContent = option;
      optionBtn.classList.add('option-btn');
      elements.optionsContainer.appendChild(optionBtn);
    });

    console.log("First question displayed successfully");
  }

  // Attempt to show first question
  try {
    showFirstQuestion();
  } catch (error) {
    console.error("Error showing first question:", error);
  }
});
