const widget = document.getElementById("widget");
const affirmationText = document.getElementById("affirmationText");

const themeBtn = document.getElementById("themeBtn");
const themeOptions = document.getElementById("themeOptions");

const fontBtn = document.getElementById("fontToggle");
const fontOptions = document.getElementById("fontOptions");
const sizeBtn = document.getElementById("sizeBtn");
const sizeOptions = document.getElementById("sizeOptions");

/* ---------------- STATE ---------------- */
let state = {
  theme: localStorage.getItem("theme") || "beige",
  font: localStorage.getItem("font") || "default",
  size: localStorage.getItem("size") || "small"
};

/* ---------------- THEME ---------------- */
function setTheme(theme) {
  state.theme = theme;
  localStorage.setItem("theme", theme);

  widget.classList.remove("beige", "pink", "sage", "blue");
  widget.classList.add(theme);
}
function buildEmbedURL() {
  const base = window.location.origin + window.location.pathname;

  return `${base}?theme=${localStorage.getItem("theme") || "beige"}&font=${localStorage.getItem("font") || "default"}&embed=true`;
}

const copyBtn = document.getElementById("copyLinkBtn");

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(buildEmbedURL());

  const msg = document.getElementById("copyMessage");

  if (msg) {
    msg.classList.remove("hidden");
    msg.classList.add("show");

    setTimeout(() => {
      msg.classList.remove("show");
      msg.classList.add("hidden");
    }, 2000);
  }
});

const sizeBtn = document.getElementById("sizeBtn");

let sizes = ["small", "medium", "wide"];
let sizeIndex = 0;

sizeBtn.addEventListener("click", () => {
  // remove old size
  widget.classList.remove("small", "medium", "wide");

  // update index
  sizeIndex = (sizeIndex + 1) % sizes.length;

  // apply new size
  widget.classList.add(sizes[sizeIndex]);
});
/* ---------------- AFFIRMATION ---------------- */
function loadAffirmation() {
  const random = affirmations[Math.floor(Math.random() * affirmations.length)];
  affirmationText.textContent = random;
}
function setFont(font) {
  state.font = font; // keeps state in sync

  widget.classList.remove("font-default", "font-serif", "font-mono");
  widget.classList.add(`font-${font}`);

  localStorage.setItem("font", font);
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
    setFont(option.dataset.font); // ✨ clean + reusable
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

setTheme(state.theme);
setFont(state.font); // ✨ THIS LINE
loadAffirmation();
