const widget = document.getElementById("widget");
const affirmationText = document.getElementById("affirmationText");

const themeBtn = document.getElementById("themeBtn");
const themeOptions = document.getElementById("themeOptions");

const fontBtn = document.getElementById("fontToggle");
const fontOptions = document.getElementById("fontOptions");

/* ---------------- STATE ---------------- */
let state = {
  theme: localStorage.getItem("theme") || "beige",
  font: localStorage.getItem("font") || "default"
};

/* ---------------- THEME ---------------- */
function setTheme(theme) {
  state.theme = theme;
  localStorage.setItem("theme", theme);

  widget.classList.remove("beige", "pink", "sage", "blue");
  widget.classList.add(theme);
}

/* ---------------- AFFIRMATION ---------------- */
function loadAffirmation() {
  const random = affirmations[Math.floor(Math.random() * affirmations.length)];
  affirmationText.textContent = random;
}

/* ---------------- POPUPS ---------------- */
themeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  themeOptions.classList.toggle("hidden");
});

fontBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  fontOptions.classList.toggle("hidden");
});

/* ---------------- OPTIONS ---------------- */
document.querySelectorAll(".theme-circle").forEach(circle => {
  circle.addEventListener("click", () => {
    setTheme(circle.dataset.theme);
    themeOptions.classList.add("hidden");
  });
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

/* ---------------- OUTSIDE CLICK ---------------- */
document.addEventListener("click", (e) => {
  if (!themeBtn.contains(e.target) && !themeOptions.contains(e.target)) {
    themeOptions.classList.add("hidden");
  }

  if (!fontBtn.contains(e.target) && !fontOptions.contains(e.target)) {
    fontOptions.classList.add("hidden");
  }
});

/* ---------------- INIT ---------------- */
setTheme(state.theme);
loadAffirmation();
