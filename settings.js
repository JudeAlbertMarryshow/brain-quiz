document.addEventListener("DOMContentLoaded", () => {
    // === DARK MODE TOGGLE ===
    const darkModeToggle = document.querySelector(".switch input");
  
    darkModeToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode", darkModeToggle.checked);
    });
  });
