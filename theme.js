const widget = document.getElementById("widget");
const affirmationText = document.getElementById("affirmation");

/* ---------------- STATE ---------------- */
let state = {
  theme: localStorage.getItem("theme") || "beige"
};

/* ---------------- THEMES ---------------- */
const themes = {
  beige: {
    bg: "#f5f5dc",
    color: "#8b7355"
  },
  pink: {
    bg: "#f9d5d3",
    color: "#b56576"
  },
  sage: {
    bg: "#cce0d0",
    color: "#6b8f71"
  },
  blue: {
    bg: "#cfe7f3",
    color: "#4a6fa5"
  }
};

/* ---------------- APPLY THEME ---------------- */
function applyTheme() {
  const t = themes[state.theme];

  widget.style.backgroundColor = t.bg;
  widget.style.color = t.color;
}

function setTheme(theme) {
  const widget = document.getElementById("widget");

  widget.classList.remove("beige", "pink", "sage", "blue");
  widget.classList.add(theme);
}

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

/* ---------------- INIT ---------------- */
applyTheme();
loadAffirmation();
