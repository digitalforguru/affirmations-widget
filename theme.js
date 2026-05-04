const widget = document.getElementById("widget");
const affirmationText = document.getElementById("affirmationText");

/* ---------------- STATE ---------------- */
let state = {
  theme: localStorage.getItem("theme") || "beige"
};

const themeBtn = document.getElementById("themeBtn");
const themeOptions = document.getElementById("themeOptions");

const fontBtn = document.getElementById("fontToggle");
const fontOptions = document.getElementById("fontOptions");

/* OPEN/CLOSE THEME */
themeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  themeOptions.classList.toggle("hidden");
});

/* OPEN/CLOSE FONT */
fontBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  fontOptions.classList.toggle("hidden");
});
document.querySelectorAll(".font-option").forEach(option => {
  option.addEventListener("click", () => {
    const font = option.dataset.font;

    widget.classList.remove("font-default", "font-serif", "font-mono");
    widget.classList.add(`font-${font}`);

    localStorage.setItem("font", font);
    fontOptions.classList.add("hidden");
  });
});


function setTheme(theme) {
  const widget = document.getElementById("widget");

  widget.classList.remove("beige", "pink", "sage", "blue");
  widget.classList.add(theme);
}

document.querySelectorAll(".theme-circle").forEach(circle => {
  circle.addEventListener("click", () => {
    setTheme(circle.dataset.theme);
    themeOptions.classList.add("hidden");
  });
});

/* ---------------- AFFIRMATIONS ---------------- */
const affirmations = [
  "you are exactly where you need to be",
  "you are growing even when it feels slow",
  "you are allowed to take up space",
  "your energy is sacred",
  "you are becoming someone you’re proud of"
];

function loadAffirmation() {
  const random = affirmations[Math.floor(Math.random() * affirmations.length)];
  affirmationText.textContent = random;
}

document.addEventListener("click", (e) => {
  if (!themeBtn.contains(e.target) && !themeOptions.contains(e.target)) {
    themeOptions.classList.add("hidden");
  }

  if (!fontBtn.contains(e.target) && !fontOptions.contains(e.target)) {
    fontOptions.classList.add("hidden");
  }
});

/* ---------------- INIT ---------------- */
applyTheme();
loadAffirmation();
