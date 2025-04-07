document.addEventListener("DOMContentLoaded", () => {
  // === DARK MODE TOGGLE ===
  const darkModeToggle = document.querySelector(".switch input");
  const modeLabel = document.getElementById("mode-label");

  function updateModeLabel(isDark) {
    modeLabel.textContent = isDark ? "Dark Mode:" : "Light Mode:";
  }

  updateModeLabel(darkModeToggle.checked);

  darkModeToggle.addEventListener("change", () => {
    const isDark = darkModeToggle.checked;
    document.body.classList.toggle("dark-mode", isDark);
    updateModeLabel(isDark);
  });

  // === FONT SIZE BUTTONS ===
  const fontButtons = document.querySelectorAll(".font-btn");

  fontButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active state from all buttons
      fontButtons.forEach((b) => b.classList.remove("active-font"));
      btn.classList.add("active-font");

      // Apply font size to the entire page
      if (btn.classList.contains("small")) {
        document.body.style.fontSize = "14px";
      } else if (btn.classList.contains("medium")) {
        document.body.style.fontSize = "18px";
      } else if (btn.classList.contains("large")) {
        document.body.style.fontSize = "22px";
      }
    });
  });
});
