document.addEventListener('DOMContentLoaded', function() {
  console.log("Debug script loaded");
  
  // Try to directly set the question text
  const questionElement = document.getElementById('question-text');
  if (questionElement) {
    questionElement.textContent = "This text is from debug.js";
    console.log("Question text element found and updated");
  } else {
    console.log("Question text element NOT found");
  }
  
  // Log all errors
  window.onerror = function(message, source, lineno, colno, error) {
    console.log("Error caught:", message);
    console.log("Source:", source);
    console.log("Line:", lineno, "Column:", colno);
    return false;
  };
});
