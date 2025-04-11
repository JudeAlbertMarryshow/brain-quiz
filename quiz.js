// Comprehensive Debugging Script
console.log("Quiz.js started loading");

// Basic questions array
const questions = [
  {
    question: "A flashing red traffic light signifies that a driver should do what?",
    options: ["stop", "speed up", "proceed with caution", "honk the horn"],
    correctAnswer: "stop"
  }
];

// Enhanced error logging
function debugElement(id) {
  console.log(`Attempting to find element with id: ${id}`);
  const element = document.getElementById(id);
  
  if (!element) {
    console.error(`❌ ELEMENT NOT FOUND: ${id}`);
    console.log(`🔍 Listing all elements on the page:`);
    document.querySelectorAll('*').forEach(el => {
      if (el.id) {
        console.log(`Found element with id: ${el.id}`);
      }
    });
  } else {
    console.log(`✅ Element found: ${id}`);
  }
  
  return element;
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("🕒 DOMContentLoaded event fired in quiz.js");
  
  // Debug document state
  console.log("📄 Document readyState:", document.readyState);
  
  // Comprehensive element check
  const criticalElementIds = [
    'current-question', 
    'total-questions', 
    'question-text', 
    'options-container'
  ];
  
  criticalElementIds.forEach(debugElement);
  
  // Get all critical elements
  const elements = {
    currentQuestion: document.getElementById('current-question'),
    totalQuestions: document.getElementById('total-questions'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container')
  };

  // Detailed element logging
  console.log("🔍 Element check results:", {
    currentQuestion: !!elements.currentQuestion,
    totalQuestions: !!elements.totalQuestions,
    questionText: !!elements.questionText,
    optionsContainer: !!elements.optionsContainer
  });

  // Try to show the first question
  function showFirstQuestion() {
    console.log("🚀 Attempting to show first question");
    
    // Comprehensive error checking
    if (!elements.questionText) {
      console.error("❌ Cannot find question text element");
      return;
    }
    
    if (!elements.optionsContainer) {
      console.error("❌ Cannot find options container");
      return;
    }

    try {
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

      console.log("✅ First question displayed successfully");
    } catch (error) {
      console.error("❌ Error in showFirstQuestion:", error);
    }
  }

  // Attempt to show first question
  try {
    showFirstQuestion();
  } catch (error) {
    console.error("❌ Outer catch - Error showing first question:", error);
  }
});
